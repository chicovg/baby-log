const dateParam = ':date';
const idParam = ':id';
const logIdParam = ':logId';

export const goTo = (link) => window.location.hash = link;

export const home = {
    path: '/',
    link: () => '#/'
};

export const createLog = {
    path: '/create-log',
    link: () => '/create-log',
};

const editLogTemplate = logId => `/edit-log/${logId}`;

export const editLog = {
    path: editLogTemplate(logIdParam),
    link: editLogTemplate
};

const deleteLogTemplate = logId => `/delete-log/${logId}`;

export const deleteLog = {
    path: deleteLogTemplate(logIdParam),
    link: deleteLogTemplate
};

const viewEntriesTemplate = logId => `/logs/${logId}/entries`;

export const viewEntries = {
    path: viewEntriesTemplate(logIdParam),
    link: viewEntriesTemplate,
};

const viewEntriesForDateTemplate = (logId, date) => `${viewEntriesTemplate(logId)}/${date}`;

export const viewEntriesForDate = {
    path: viewEntriesForDateTemplate(logIdParam, dateParam),
    link: viewEntriesForDateTemplate,
};

const addEntryTemplate = (logId, date) => `/logs/${logId}/add-entry/${date}`;

export const addEntry = {
    path: addEntryTemplate(logIdParam, dateParam),
    link: addEntryTemplate,
};

const editEntryTemplate = (logId, id) => `/logs/${logId}/edit-entry/${id}`;

export const editEntry = {
    path: editEntryTemplate(logIdParam, idParam),
    link: editEntryTemplate,
};

const deleteEntryTemplate = (logId, date, id) => `/logs/${logId}/delete-entry/${date}/${id}`;

export const deleteEntry = {
    path: deleteEntryTemplate(logIdParam, dateParam, idParam),
    link: deleteEntryTemplate,
};
