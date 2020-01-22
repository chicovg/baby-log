import React from 'react';
import {Container, Header} from 'semantic-ui-react';
import {useSelector, useDispatch} from 'react-redux';

import LogForm from './LogForm';
import {saveUpdatedLog} from '../actions';
import {selectUserLog, selectUserId} from '../selectors';

const EditLogPage = ({logId}) => {
    const userId = useSelector(selectUserId);
    const log = useSelector(selectUserLog(userId, logId));
    const dispatch = useDispatch();

    const saveLog = logToSave =>
        dispatch(saveUpdatedLog({userId, logId, logToSave}));

    return (
        <Container>
            <Header as="h2">Edit this log</Header>
            <LogForm log={log} saveLog={saveLog} />
        </Container>
    );
};

export default EditLogPage;
