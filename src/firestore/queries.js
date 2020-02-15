const userPath = 'usersv2';

export const logs = (userId) => `${userPath}/${userId}/logs`;

export const logEntries = (userId) => `${userPath}/${userId}/entries`;

export const logById = (userId, logId) => `/${userPath}/${userId}/logs/${logId}`;

export const logEntriesById = (userId, logId) => `/${userPath}/${userId}/logs/${logId}/entries`;
