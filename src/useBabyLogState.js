import React from 'react';

const logEntriesKey = 'babylog-logEntries';

const getFromLocalStorage = (key, defaultValue) => {
    const logEntries = localStorage.getItem(key);

    return logEntries ? JSON.parse(logEntries) : defaultValue;
};

const setLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

const useBabyLogState = () => {
    const [logEntries, setLogEntries] = React.useState(
        getFromLocalStorage(logEntriesKey, {})
    );

    React.useEffect(() => {
        setLocalStorage(logEntriesKey, logEntries);
    }, [logEntries]);

    const getLogEntriesForDate = (dateKey) => logEntries[dateKey] || [];
    const addLogEntryForDate = (dateKey, entry) => {
        const entriesForDate = getLogEntriesForDate(dateKey);
        const updatedEntriesForDate = [
            ...entriesForDate,
            entry
        ];
        const updatedEntries = {
            ...logEntries,
            [dateKey]: updatedEntriesForDate,
        };

        setLogEntries(updatedEntries);
    };

    return [getLogEntriesForDate, addLogEntryForDate];
};

export default useBabyLogState;
