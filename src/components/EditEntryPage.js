import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { useFirestore } from 'react-redux-firebase';

import LogEntryForm from './LogEntryForm';

const selectLogEntry = id => state => {
    const userId = state.firebase.auth.uid;
    const users = state.firestore.data.users;

    if (!users) {
        return null;
    }

    return users[userId].entries[id];
};

function EditEntryPage({ logId, id }) {
    const userId = useSelector(state => state.firebase.auth.uid);
    const entry = useSelector(selectLogEntry(id));
    const firestore = useFirestore();

    const saveEntry = entryToSave => firestore
          .collection('users')
          .doc(userId)
          .collection('logs')
          .doc(logId)
          .collection('entries')
          .doc(id)
          .set(entryToSave);

    return (
        <Container>
          <Header as="h2">Update entry</Header>
          <LogEntryForm
            date={ entry ? entry.date : '' }
            entry={ entry || { userId } }
            saveEntry={ saveEntry }
          />
        </Container>
    );
}

export default EditEntryPage;
