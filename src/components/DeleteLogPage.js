import React from 'react';
import {useSelector} from 'react-redux';
import {useFirestore} from 'react-redux-firebase';

import {Container, Form, Message} from 'semantic-ui-react';
import {goTo, home} from '../utils/locations';

function DeleteLogPage({logId}) {
    const userId = useSelector(state => state.firebase.auth.uid);
    const firestore = useFirestore();
    const goHome = () => goTo(home.link());
    const deleteLog = () =>
        firestore
            .collection('users')
            .doc(userId)
            .collection('logs')
            .doc(logId)
            .delete()
            .then(goHome);

    return (
        <Container>
            <Message warning>
                <Message.Header>Are you sure that you want to delete?</Message.Header>
                <p>
                    This will delete <strong>all the entries</strong> for this log.
                </p>
            </Message>
            <Form>
                <Form.Group inline>
                    <Form.Button primary onClick={deleteLog}>
                        Confirm
                    </Form.Button>
                    <Form.Button onClick={goHome}>Cancel</Form.Button>
                </Form.Group>
            </Form>
        </Container>
    );
}

export default DeleteLogPage;
