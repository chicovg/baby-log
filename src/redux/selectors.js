import {compose} from 'redux';
import orderBy from 'lodash/orderBy';
import take from 'lodash/take';
import {EVENT} from '../utils/constants';

export const objectToArray = obj =>
    Object.keys(obj)
        .filter(key => obj[key])
        .map(key => ({
            id: key,
            ...obj[key]
        }));

export const selectDataRequested = query => state => state.firestore.status.requested[query];

export const selectAuth = state => state.firebase.auth;

export const selectUserId = state => state.firebase.auth.uid;

const selectUsers = state => state.firestore.data.users || {};

const selectUser = userId => users => users[userId] || {};

const selectLogsObj = ({logs = {}}) => logs || {};

export const selectUserLogs = userId =>
    compose(objectToArray, selectLogsObj, selectUser(userId), selectUsers);

const selectLog = logId => (logs = {}) => logs[logId];

export const selectUserLog = (userId, logId) =>
    compose(selectLog(logId), selectLogsObj, selectUser(userId), selectUsers);

const selectLogEnriesObj = ({entries}) => entries || {};

const filterByLogId = logId => (entries = []) => entries.filter(entry => entry.logId === logId);

const filterByDate = date => (entries = []) => entries.filter(entry => entry.date === date);

const sortByTime = date => (entries = []) => orderBy(entries, ['time']);

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

const selectEntry = id => (entries = {}) => entries[id];

export const selectUserLogEntry = (userId, logId, id) =>
    compose(selectEntry(id), selectLogEnriesObj, selectUser(userId), selectUsers);

const updateCounts = (event, {diapers, feedings}) => ({
    diapers: event === EVENT.DIAPER ? diapers + 1 : diapers,
    feedings: event === EVENT.FEEDING ? feedings + 1 : feedings
});

const toDailySummaries = (summaries, {date, event}) => {
    const emptySummary = {
        diapers: 0,
        feedings: 0
    };
    const summaryForDate = summaries[date] || emptySummary;
    const updatedSummary = updateCounts(event, summaryForDate);

    return {
        ...summaries,
        [date]: updatedSummary
    };
};

const groupByLogDate = (entries = []) => entries.reduce(toDailySummaries, {});

const sortById = (summaries = []) => orderBy(summaries, ['id'], ['desc']);

const mostRecent = (summaries = []) => take(summaries, 7);

export const selectUserLogSummaries = (userId, logId) =>
    compose(
        mostRecent,
        sortById,
        objectToArray,
        groupByLogDate,
        selectUserLogEntries(userId, logId)
    );
