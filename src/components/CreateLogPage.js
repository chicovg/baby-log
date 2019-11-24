import React from 'react';
import {Container, Header} from 'semantic-ui-react';
import {useSelector} from 'react-redux';
import {useFirestore} from 'react-redux-firebase';

import LogForm from './LogForm';
import {selectUserId} from '../redux/selectors';

const CreateLogPage = () => {
    const userId = useSelector(selectUserId);
    const firestore = useFirestore();

    const saveLog = logToSave =>
        firestore
            .collection('users')
            .doc(userId)
            .collection('logs')
            .add(logToSave);

    return (
        <Container>
            <Header as="h2">Create a new log</Header>
            <LogForm saveLog={saveLog} />
        </Container>
    );
};

export default CreateLogPage;
