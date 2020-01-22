import React from 'react';
import {Container, Header} from 'semantic-ui-react';
import { useSelector, useDispatch} from 'react-redux';

import LogForm from './LogForm';
import {saveUpdatedLog} from '../actions';
import {selectUserId} from '../selectors';

const CreateLogPage = () => {
    const userId = useSelector(selectUserId);
    const dispatch = useDispatch();

    const saveLog = (logToSave) => dispatch(saveUpdatedLog({userId, logToSave}));

    return (
        <Container>
            <Header as="h2">Create a new log</Header>
            <LogForm saveLog={saveLog} />
        </Container>
    );
};

export default CreateLogPage;
