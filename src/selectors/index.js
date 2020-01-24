import compose from 'lodash/fp/compose';
import orderBy from 'lodash/fp/orderBy';
import take from 'lodash/fp/take';

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

const selectUsers = (state) => state.firestore.data.users || {};

const selectUser = (userId) => (users) => users[userId] || {};

const selectLogsObj = ({logs = {}}) => logs || {};

export const selectUserLogs = (userId) =>
    compose(objectToArray, selectLogsObj, selectUser(userId), selectUsers);

const selectLog = (logId) => (logs = {}) => logs[logId];

export const selectUserLog = (userId, logId) =>
    compose(selectLog(logId), selectLogsObj, selectUser(userId), selectUsers);

const selectLogEnriesObj = ({entries}) => entries || {};

const filterByLogId = (logId) => (entries = []) => entries.filter((entry) => entry.logId === logId);

const filterByDate = (date) => (entries = []) => entries.filter((entry) => entry.date === date);

const sortByTime = (date) => (entries = []) => orderBy(['time'], ['asc'], entries);

const selectUserLogEntries = (userId, logId, date) =>
    compose(
        filterByLogId(logId),
        objectToArray,
        selectLogEnriesObj,
        selectUser(userId),
        selectUsers
    );

export const selectUserLogEntriesForDate = (userId, logId, date) =>
    compose(sortByTime(date), filterByDate(date), selectUserLogEntries(userId, logId));

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

const normalizeUnits = (unitTo) => (entries = []) => entries.map((entry) => {
    if (!(entry.amount && entry.unit)) {
        return entry;
    }

    return {
        ...entry,
        amount: convert(entry.unit, unitTo, entry.amount),
        unit: unitTo,
    };
})

const setCounts = ({amount, event, feeding}, summary) => {
    switch(event) {
        case EVENT.DIAPER:
            return {
                ...summary,
                diapers: summary.diapers + 1,
            };
        case EVENT.FEEDING: {
            const feedings = summary.feedings + 1;
            let pumped = summary.pumped;

            if (feeding === FEEDING.BOTTLE) {
                pumped -= amount;
            }

            return {
                ...summary,
                feedings,
                pumped,
            }
        }
        case EVENT.PUMPING:
            return {
                ...summary,
                pumped: summary.pumped + amount,
            }
        default:
            return summary;
    };
}

const toDailySummaries = (summaries, entry) => {
    const emptySummary = {
        diapers: 0,
        feedings: 0,
        pumped: 0,
    };
    const summaryForDate = summaries[entry.date] || emptySummary;
    const updatedSummary = setCounts(entry, summaryForDate);

    return {
        ...summaries,
        [entry.date]: updatedSummary,
    };
};

const groupByLogDate = (entries = []) => entries.reduce(toDailySummaries, {});

const sortById = (summaries = []) => orderBy(['id'], ['desc'], summaries);

const mostRecent = (summaries = []) => take(7, summaries);

export const selectUserLogSummaries = (userId, logId, unit) =>
    compose(
        mostRecent,
        sortById,
        objectToArray,
        groupByLogDate,
        normalizeUnits(unit),
        selectUserLogEntries(userId, logId)
    );
