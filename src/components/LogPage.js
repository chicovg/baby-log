import React from 'react';
import {Container} from 'semantic-ui-react';
import {useSelector} from 'react-redux';

import LogDateNavigation from './LogDateNavigation';
import Log from './Log';
import {selectUserId, selectUserLogEntriesForDate} from '../selectors';
import {currentDateKey} from '../utils/dates';

function LogPage({date: dateProp, logId}) {
    const userId = useSelector(selectUserId);
    const date = dateProp || currentDateKey();
    const entries = useSelector(selectUserLogEntriesForDate(userId, logId, date));

    return (
        <Container>
            <LogDateNavigation date={date} logId={logId} />
            <Log logEntries={entries} logId={logId} />
        </Container>
    );
}

export default LogPage;
