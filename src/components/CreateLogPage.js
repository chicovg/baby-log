import React from 'react';
import {Container, Header} from 'semantic-ui-react';
import {useSelector, useDispatch} from 'react-redux';

import LogForm from './LogForm';
import {saveNewLog} from '../actions';
import {useLogState} from '../hooks';
import {selectUserId} from '../selectors';

const CreateLogPage = () => {
    const userId = useSelector(selectUserId);
    const initialState = {
        title: '',
        babyName: '',
        unit: 'fl. oz.',
    };
    const dispatch = useDispatch();
    const saveLog = (logToSave) => dispatch(saveNewLog({userId, logToSave}));
    const logState = useLogState({initialState, saveLog});

    return (
        <Container>
            <Header as='h2'>Create a new log</Header>
            <LogForm {...logState} />
        </Container>
    );
};

export default CreateLogPage;
