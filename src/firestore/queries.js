export const logById = (userId, logId) => `/users/${userId}/logs/${logId}`;

export const logEntriesById = (userId, logId) => `/users/${userId}/logs/${logId}/entries`;

// new structure
// /users/${userId}/logs
// /users/${userId}/entries
