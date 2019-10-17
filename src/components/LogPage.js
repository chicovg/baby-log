import React from 'react';
import { Container } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';

import AppLoader from './AppLoader';
import LogDateNavigation from './LogDateNavigation';
import Log from './Log';
import {
    selectEntriesQueryStatus,
    selectUserId,
    selectUserLogEntries
} from '../redux/selectors';
import { currentDateKey } from '../utils/dates';

function LogPage({ date: dateProp, logId }) {
    const userId = useSelector(selectUserId);
    const entriesQuery = `/users/${userId}/logs/${logId}/entries`;

    useFirestoreConnect([entriesQuery], [logId, userId]);

    const date = dateProp || currentDateKey();
    const entries = useSelector(selectUserLogEntries(userId, logId, date));
    const entriesRequested = useSelector(selectEntriesQueryStatus(userId, logId));

    return (
        <Container>
          <AppLoader
            isSignedIn={ userId }
            isLoading={ !entriesRequested }
          />
          <LogDateNavigation
            date={ date }
            logId={ logId }
          />
          <Log
            logEntries={ entries }
            logId={ logId }
          />
        </Container>
    );
}

export default LogPage;
