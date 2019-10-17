import React from 'react';
import { Card, Container, Header } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';

import AppLoader from './AppLoader';
import LogSummary from './LogSummary';
import LogSummaryNavigation from './LogSummaryNavigation';
import { selectLogsQueryStatus, selectUserId, selectUserLogs } from '../redux/selectors';

function LogSummaryPage() {
    const userId = useSelector(selectUserId);
    const logsQuery = `/users/${userId}/logs`;

    useFirestoreConnect([logsQuery], [userId]);

    const logs = useSelector(selectUserLogs(userId));
    const logsRequested = useSelector(selectLogsQueryStatus(userId));

    return (
        <Container>
          <AppLoader
            isSignedIn={ userId }
            isLoading={ !logsRequested }
          />
          <LogSummaryNavigation />
          {
              !logs.length
                  ? <Header as="h3">Create a new log to get started!</Header>
                  : null
          }
          <Card.Group>
            {
                logs
                    ? logs.map(log => <LogSummary key={ log.id } { ...log }/>)
                    : null
            }
          </Card.Group>
        </Container>
    );
}

export default LogSummaryPage;
