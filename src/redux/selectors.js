import { compose } from 'redux';

export const selectLogsQueryStatus = userId => state =>
    state.firestore.status.requested[`users/${userId}/logs`];

export const selectEntriesQueryStatus = (userId, logId) => state =>
    state.firestore.status.requested[`users/${userId}/logs/${logId}/entries`];

export const selectUserId = state => state.firebase.auth.uid;


const selectUsers = state => state.firestore.data.users || {};

const selectUser = userId => users => users[userId] || {};

const selectLogs = ({logs = {}}) => {
    return Object.keys(logs)
        .map(id => ({
            id,
            ...logs[id],
        }));
};

export const selectUserLogs = userId => compose(
    selectLogs,
    selectUser(userId),
    selectUsers,
);

const selectLog = logId => ({logs = {}}) => {
    return logs[logId];
};

const timeComparator = (e1, e2) => {
    if (e1.time < e2.time) {
        return -1;
    }
    if (e1.time > e2.time) {
        return 1;
    }
    return 0;
};

const selectLogEntries = date => (log = {}) => {
    const entries = log.entries || {};

    let entriesArray = Object.keys(entries)
        .map(key => ({
            id: key,
            ...entries[key],
        }))
        .filter(entry => entry.date === date);

    entriesArray.sort(timeComparator);

    return entriesArray;
};

export const selectUserLogEntries = (userId, logId, date) => compose(
    selectLogEntries(date),
    selectLog(logId),
    selectUser(userId),
    selectUsers,
);
