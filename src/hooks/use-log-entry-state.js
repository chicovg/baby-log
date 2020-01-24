import React, {useState} from 'react';

import {toDisplayedEntry, toStoredEntry} from '../utils/entries';

const defaultEntryState = {
    date: '',
    time: '',
    event: '',
    feeding: '',
    breast: '',
    duration: '',
    amount: '',
    diaper: '',
    mood: '',
    notes: '',
    userId: '',
};

export default ({initialState, saveEntry}) => {
    const [entry, setEntry] = useState(toDisplayedEntry(initialState));

    const handleEntryChange = (e, {name, value}) => {
        if (name === 'event') {
            setEntry({
                ...entry,
                event: value,
                feeding: '',
                breast: '',
                duration: '',
                amount: '',
                diaper: '',
            });
        } else if (name === 'feeding') {
            setEntry({
                ...entry,
                feeding: value,
                breast: '',
                duration: '',
                amount: '',
            });
        } else {
            setEntry({
                ...entry,
                [name]: value,
            });
        }
    };

    const handleEntrySubmit = () => saveEntry(toStoredEntry(entry));

    return {
        entry,
        handleEntryChange,
        handleEntrySubmit,
    };
};
