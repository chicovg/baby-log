import React from 'react';
import {Container, Header} from 'semantic-ui-react';
import {useSelector} from 'react-redux';
import {useFirestore} from 'react-redux-firebase';

import LogEntryForm from './LogEntryForm';
import {selectUserLogEntry} from '../redux/selectors';

const EditEntryPage = ({logId, id}) => {
    const userId = useSelector(state => state.firebase.auth.uid);
    const entry = useSelector(selectUserLogEntry(userId, logId, id));
    const firestore = useFirestore();

    const saveEntry = entryToSave =>
        firestore
            .collection('users')
            .doc(userId)
            .collection('entries')
            .doc(id)
            .set(entryToSave);

    return (
        <Container>
            <Header as="h2">Update entry</Header>
            <LogEntryForm
                date={entry ? entry.date : ''}
                entry={entry || {userId}}
                logId={logId}
                isUpdate
                saveEntry={saveEntry}
            />
        </Container>
    );
};

export default EditEntryPage;
