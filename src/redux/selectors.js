import { compose } from 'redux';

export const objectToArray = obj =>
      Object.keys(obj)
      .filter(key => obj[key])
      .map(key => ({
          id: key,
          ...obj[key],
      }));

export const selectDataRequested = query => state =>
    state.firestore.status.requested[query];

export const selectAuth = state => state.firebase.auth;

export const selectUserId = state => state.firebase.auth.uid;

const selectUsers = state => state.firestore.data.users || {};

const selectUser = userId => users => users[userId] || {};

const selectLogsObj = ({logs = {}}) => logs || {};

export const selectUserLogs = userId => compose(
    objectToArray,
    selectLogsObj,
    selectUser(userId),
    selectUsers,
);

const selectLog = logId => (logs = {}) => logs[logId];

export const selectUserLog = (userId, logId) => compose(
    selectLog(logId),
    selectLogsObj,
    selectUser(userId),
    selectUsers,
);

const selectLogEnriesObj = ({entries}) => entries || {};

const filterByLogId = logId => (entries = []) => entries.filter(entry => entry.logId === logId);

const filterByDate = date => (entries = []) => entries.filter(entry => entry.date === date);

const timeComparator = (e1, e2) => {
    if (e1.time < e2.time) {
        return -1;
    }
    if (e1.time > e2.time) {
        return 1;
    }
    return 0;
};

const sortByDate = date => (entries = []) => {
    entries.sort(timeComparator);

    return entries;
};

export const selectUserLogEntries = (userId, logId, date) => compose(
    sortByDate(date),
    filterByDate(date),
    filterByLogId(logId),
    objectToArray,
    selectLogEnriesObj,
    selectUser(userId),
    selectUsers,
);

const lastEntryDate = (lastDate, { date }) => {
    if (!lastDate || date > lastDate) {
        return date;
    }

    return lastDate;
};

const selectLastLogDate = (entries = []) => entries.reduce(lastEntryDate, null);

export const selectLastUserLogDate = (userId, logId) => compose(
    selectLastLogDate,
    filterByLogId(logId),
    objectToArray,
    selectLogEnriesObj,
    selectUser(userId),
    selectUsers,
);

const selectEntry = id => (entries = {}) => entries[id];

export const selectUserLogEntry = (userId, logId, id) => compose(
    selectEntry(id),
    selectLogEnriesObj,
    selectUser(userId),
    selectUsers,
);
