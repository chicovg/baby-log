import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Container, Header} from 'semantic-ui-react';

import LogEntryForm from './LogEntryForm';
import {saveNewEntry} from '../actions';
import {selectUserId} from '../selectors';

export default ({logId, date}) => {
    const userId = useSelector(selectUserId);
    const entry = {date, logId, userId};
    const dispatch = useDispatch();
    const saveEntry = (entryToSave) => dispatch(saveNewEntry({logId, userId, entryToSave}));

    return (
        <Container>
            <Header as='h2'>Add new entry</Header>
            <LogEntryForm
                date={date}
                entry={entry}
                logId={logId}
                isUpdate={false}
                saveEntry={saveEntry}
            />
        </Container>
    );
};
