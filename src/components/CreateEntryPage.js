import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Container, Header} from 'semantic-ui-react';

import LogEntryForm from './LogEntryForm';
import {saveNewEntry} from '../actions';
import {useLogEntryState} from '../hooks';
import {selectUserId} from '../selectors';

export default ({logId, date}) => {
    const userId = useSelector(selectUserId);
    const entry = {date, logId, userId};

    const dispatch = useDispatch();
    const saveEntry = (entryToSave) => dispatch(saveNewEntry({logId, userId, entryToSave}));

    const {entry: entryState, handleEntryChange, handleEntrySubmit} = useLogEntryState({
        initialState: entry,
        saveEntry,
    });

    return (
        <Container>
            <Header as='h2'>Add new entry</Header>
            <LogEntryForm
                entry={entryState}
                handleChange={handleEntryChange}
                handleSubmit={handleEntrySubmit}
            />
        </Container>
    );
};
