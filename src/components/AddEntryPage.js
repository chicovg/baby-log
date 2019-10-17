import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { useFirestore } from 'react-redux-firebase';

import AppLoader from './AppLoader';
import LogEntryForm from './LogEntryForm';
import { selectUserId } from '../redux/selectors';

function AddEntryPage({ logId, date }) {
    const userId = useSelector(selectUserId);
    const entry = { userId, date };
    const firestore = useFirestore();

    const saveEntry = entryToSave => firestore
          .collection('users')
          .doc(userId)
          .collection('logs')
          .doc(logId)
          .collection('entries')
          .add(entryToSave);

    return (
        <Container>
          <AppLoader
            isSignedIn={ userId }
            isLoading={ !userId }
          />
          <Header as="h2">Add new entry</Header>
          <LogEntryForm
            date={ date }
            entry={ entry }
            isUpdate={ false }
            saveEntry={ saveEntry }
          />
        </Container>
    );
}

export default AddEntryPage;
