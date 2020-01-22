import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Container, Form, Message} from 'semantic-ui-react';

import {selectUserId} from '../selectors';
import {deleteEntry, goToEntriesForDate} from '../actions';

export default ({logId, date, id}) => {
    const userId = useSelector(selectUserId);
    const dispatch = useDispatch();

    const dispatchDeleteEntry = () => dispatch(deleteEntry({userId, logId, id, date}))
    const dispatchGoToDate = () => dispatch(goToEntriesForDate(logId, date));

    return (
        <Container>
            <Message warning>
                <Message.Header>Are you sure that you want to delete?</Message.Header>
                <p>Please confirm.</p>
            </Message>
            <Form>
                <Form.Group inline>
                    <Form.Button primary onClick={dispatchDeleteEntry}>
                        Confirm
                    </Form.Button>
                    <Form.Button onClick={dispatchGoToDate}>Cancel</Form.Button>
                </Form.Group>
            </Form>
        </Container>
    );
}
