import React from 'react';
import {Container, Message} from 'semantic-ui-react';
import {useSelector} from 'react-redux';
import isEmpty from 'lodash/fp/isEmpty';

import LogDateNavigation from './LogDateNavigation';
import Log from './Log';
import {selectUserId, selectUserLogEntriesForDate} from '../selectors';
import {currentDateKey} from '../utils/dates';

export default ({date: dateProp, logId}) => {
    const userId = useSelector(selectUserId);
    const date = dateProp || currentDateKey();
    const entries = useSelector(selectUserLogEntriesForDate(userId, logId, date));

    return (
        <Container>
            <LogDateNavigation date={date} logId={logId} />
            {isEmpty(entries) ? (
                <Message info>No entries logged today.</Message>
            ) : (
                <Log logEntries={entries} logId={logId} />
            )}
        </Container>
    );
};
