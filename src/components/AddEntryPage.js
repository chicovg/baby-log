import React from 'react';
import {Container, Header} from 'semantic-ui-react';
import {useSelector} from 'react-redux';
import {useFirestore} from 'react-redux-firebase';

import LogEntryForm from './LogEntryForm';
import {selectUserId} from '../redux/selectors';

function AddEntryPage({logId, date}) {
    const userId = useSelector(selectUserId);
    const entry = {date, logId, userId};
    const firestore = useFirestore();

    const saveEntry = entryToSave =>
        firestore
            .collection('users')
            .doc(userId)
            .collection('entries')
            .add({...entryToSave});

    return (
        <Container>
            <Header as="h2">Add new entry</Header>
            <LogEntryForm
                date={date}
                entry={entry}
                logId={logId}
                isUpdate={false}
                saveEntry={saveEntry}
            />
        </Container>
    );
}

export default AddEntryPage;
