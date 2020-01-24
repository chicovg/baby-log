import React from 'react';
import {Container, Header} from 'semantic-ui-react';
import {useDispatch, useSelector} from 'react-redux';

import LogEntryForm from './LogEntryForm';
import {saveUpdatedEntry} from '../actions';
import {useLogEntryState} from '../hooks';
import {selectUserId, selectUserLogEntry} from '../selectors';

export default ({logId, id}) => {
    const userId = useSelector(selectUserId);
    const entry = useSelector(selectUserLogEntry(userId, logId, id));

    const dispatch = useDispatch();
    const saveEntry = (entryToSave) => dispatch(saveUpdatedEntry({logId, userId, id, entryToSave}));

    const {entry: entryState, handleEntryChange, handleEntrySubmit} = useLogEntryState({
        initialState: entry,
        saveEntry,
    });

    return (
        <Container>
            <Header as='h2'>Update entry</Header>
            <LogEntryForm
                entry={entryState}
                handleChange={handleEntryChange}
                handleSubmit={handleEntrySubmit}
            />
        </Container>
    );
};
