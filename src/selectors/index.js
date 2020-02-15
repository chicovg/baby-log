import __ from 'lodash/fp/__';
import compose from 'lodash/fp/compose';
import divide from 'lodash/fp/divide';
import filter from 'lodash/fp/filter';
import orderBy from 'lodash/fp/orderBy';
import mapValues from 'lodash/fp/mapValues';
import isEqual from 'lodash/fp/isEqual';
import isNil from 'lodash/fp/isNil';
import size from 'lodash/fp/size';
import take from 'lodash/fp/take';
import uniqBy from 'lodash/fp/uniqBy';

import roundTo from '../utils/roundTo';
import {EVENT, FEEDING} from '../utils/constants';
import {convert} from '../utils/units';

export const objectToArray = (obj) =>
    Object.keys(obj)
        .filter((key) => obj[key])
        .map((key) => ({
            id: key,
            ...obj[key],
        }));

export const selectDataRequested = (query) => (state) => state.firestore.status.requested[query];

export const selectAuth = (state) => state.firebase.auth;

export const selectUserId = (state) => state.firebase.auth.uid;

const selectUsers = (state) => state.firestore.data.usersv2 || {};

const selectUser = (userId) => (users) => users[userId] || {};

const selectLogsObj = ({logs = {}}) => logs || {};

export const selectUserLogs = (userId) =>
    compose(objectToArray, selectLogsObj, selectUser(userId), selectUsers);

const selectLog = (logId) => (logs = {}) => logs[logId];

export const selectUserLog = (userId, logId) =>
    compose(selectLog(logId), selectLogsObj, selectUser(userId), selectUsers);

const selectLogEnriesObj = ({entries}) => entries || {};

const filterByLogId = (logId) => filter((entry) => entry.logId === logId);

const filterByDate = (date) => filter((entry) => entry.date === date);

const filterByEventType = (eventType) =>
    filter((entry) => isNil(eventType) || isEqual(entry.event, eventType));

const sortByTime = (date) => (entries = []) => orderBy(['time'], ['asc'], entries);

const selectUserLogEntries = (userId, logId, date) =>
    compose(
        filterByLogId(logId),
        objectToArray,
        selectLogEnriesObj,
        selectUser(userId),
        selectUsers
    );

export const selectUserLogEntriesForDate = (userId, logId, date, eventType) =>
    compose(
        sortByTime(date),
        filterByEventType(eventType),
        filterByDate(date),
        selectUserLogEntries(userId, logId)
    );

const lastEntryDate = (lastDate, {date}) => {
    if (!lastDate || date > lastDate) {
        return date;
    }

    return lastDate;
};

const selectLastLogDate = (entries = []) => entries.reduce(lastEntryDate, null);

export const selectLastUserLogDate = (userId, logId) =>
    compose(selectLastLogDate, selectUserLogEntries(userId, logId));

const selectEntry = (id) => (entries = {}) => entries[id];

export const selectUserLogEntry = (userId, logId, id) =>
    compose(selectEntry(id), selectLogEnriesObj, selectUser(userId), selectUsers);

const normalizeUnits = (unitTo) => (entries = []) =>
    entries.map((entry) => {
        if (!(entry.amount && entry.unit)) {
            return entry;
        }

        return {
            ...entry,
            amount: convert(entry.unit, unitTo, entry.amount),
            unit: unitTo,
        };
    });

const emptySummary = {
    diapers: 0,
    feedings: 0,
    pumped: 0,
    drank: 0,
    net: 0,
};

const toCount = ({date, amount, event, feeding}, summary) => {
    switch (event) {
        case EVENT.DIAPER:
            return {
                ...emptySummary,
                date,
                diapers: 1,
            };
        case EVENT.FEEDING: {
            const isBottle = feeding === FEEDING.BOTTLE;

            return {
                ...emptySummary,
                date,
                feedings: 1,
                drank: isBottle ? amount : 0,
                net: isBottle ? 0 - amount : 0,
            };
        }
        case EVENT.PUMPING:
            return {
                ...emptySummary,
                date,
                pumped: amount,
                net: amount,
            };
        default:
            return {
                ...emptySummary,
                date,
            };
    }
};

const toCounts = (entries = []) => entries.map(toCount);

const sumCounts = (counts1, counts2) => ({
    diapers: counts1.diapers + counts2.diapers,
    feedings: counts1.feedings + counts2.feedings,
    pumped: counts1.pumped + counts2.pumped,
    drank: counts1.drank + counts2.drank,
    net: counts1.net + counts2.net,
});

const toDailySummaries = (summaries, counts) => {
    const summaryForDate = summaries[counts.date] || emptySummary;

    return {
        ...summaries,
        [counts.date]: sumCounts(summaryForDate, counts),
    };
};

const groupByLogDate = (counts = []) => counts.reduce(toDailySummaries, {});

const sortById = (summaries = []) => orderBy(['id'], ['desc'], summaries);

const mostRecent = (summaries = []) => take(7, summaries);

const getDailySummaries = compose(mostRecent, sortById, objectToArray, groupByLogDate);

const getTotals = (counts = []) => counts.reduce(sumCounts, emptySummary);

const populateSummaries = (counts = []) => {
    const dailySummaries = getDailySummaries(counts);
    const totals = getTotals(dailySummaries);
    const totalDays = compose(size, uniqBy('id'))(dailySummaries);
    const averages = mapValues(compose(roundTo(2), divide(__, totalDays)), totals);

    return {
        averages,
        dailySummaries,
        totals,
    };
};

export const selectUserLogSummaries = (userId, logId, unit) =>
    compose(populateSummaries, toCounts, normalizeUnits(unit), selectUserLogEntries(userId, logId));
