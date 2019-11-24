import React from 'react';
import {Container, Header} from 'semantic-ui-react';
import {useSelector} from 'react-redux';
import {useFirestore} from 'react-redux-firebase';

import LogForm from './LogForm';
import {selectUserLog, selectUserId} from '../redux/selectors';

const EditLogPage = ({logId}) => {
    const userId = useSelector(selectUserId);
    const log = useSelector(selectUserLog(userId, logId));
    const firestore = useFirestore();

    const saveLog = logToSave =>
        firestore
            .collection('users')
            .doc(userId)
            .collection('logs')
            .doc(logId)
            .set(logToSave);

    return (
        <Container>
            <Header as="h2">Edit this log</Header>
            <LogForm log={log} saveLog={saveLog} />
        </Container>
    );
};

export default EditLogPage;
