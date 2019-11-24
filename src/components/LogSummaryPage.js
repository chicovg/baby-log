import React from 'react';
import {Card, Container, Header} from 'semantic-ui-react';
import {useSelector} from 'react-redux';

import LogSummary from './LogSummary';
import LogSummaryNavigation from './LogSummaryNavigation';
import {selectUserId, selectUserLogs} from '../redux/selectors';

function LogSummaryPage() {
    const userId = useSelector(selectUserId);
    const logs = useSelector(selectUserLogs(userId));

    return (
        <Container>
            <LogSummaryNavigation />
            {logs && !logs.length ? (
                <Header as="h3">Create a new log to get started!</Header>
            ) : null}
            <Card.Group>
                {logs ? logs.map(log => <LogSummary key={log.id} {...log} />) : null}
            </Card.Group>
        </Container>
    );
}

export default LogSummaryPage;
