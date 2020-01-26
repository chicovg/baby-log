export const logs = (userId) => `usersv1/${userId}/logs`;

export const logEntries = (userId) => `usersv1/${userId}/entries`;

export const logById = (userId, logId) => `/usersv1/${userId}/logs/${logId}`;

export const logEntriesById = (userId, logId) => `/usersv1/${userId}/logs/${logId}/entries`;
