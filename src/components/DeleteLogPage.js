import React from 'react';
import { useSelector, useDispatch} from 'react-redux';
import {Container, Form, Message} from 'semantic-ui-react';

import {selectUserId} from '../selectors';
import {deleteLog, goToHome} from '../actions';

export default ({logId}) => {
    const userId = useSelector(selectUserId);
    const dispatch = useDispatch();
    const dispatchDeleteLog = () => dispatch(deleteLog({userId, logId}))
    const dispatchGoToHome = () => dispatch(goToHome);

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
                    <Form.Button primary onClick={dispatchDeleteLog}>
                        Confirm
                    </Form.Button>
                    <Form.Button onClick={dispatchGoToHome}>Cancel</Form.Button>
                </Form.Group>
            </Form>
        </Container>
    );
};
