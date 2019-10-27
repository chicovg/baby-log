import React from 'react';
import { useSelector } from 'react-redux';
import { useFirestore } from 'react-redux-firebase';

import { Container, Form, Message } from 'semantic-ui-react';
import { goTo, viewEntriesForDate } from '../utils/locations';

function DeleteEntryPage({ logId, date, id }) {
    const userId = useSelector(state => state.firebase.auth.uid);
    const firestore = useFirestore();

    const goToViewEntries = () => goTo(viewEntriesForDate.link(logId, date));
    const deleteEntry = () => firestore
          .collection('users')
          .doc(userId)
          .collection('entries')
          .doc(id)
          .delete()
          .then(goToViewEntries);

    return (
        <Container>
          <Message warning>
            <Message.Header>Are you sure that you want to delete?</Message.Header>
            <p>Please confirm.</p>
          </Message>
          <Form>
            <Form.Group inline>
              <Form.Button
                primary
                onClick={ deleteEntry }
              >
                Confirm
              </Form.Button>
              <Form.Button onClick={ goToViewEntries }>
                Cancel
              </Form.Button>
            </Form.Group>
          </Form>
        </Container>
    );
}

export default DeleteEntryPage;
