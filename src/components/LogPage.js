import React, {useState} from 'react';
import {Container, Divider, Message} from 'semantic-ui-react';
import {useSelector} from 'react-redux';
import isEmpty from 'lodash/fp/isEmpty';
import isNil from 'lodash/fp/isNil';

import LogDateNavigation from './LogDateNavigation';
import Log from './Log';
import LogFilter from './LogFilter';
import {selectUserId, selectUserLogEntriesForDate} from '../selectors';
import {currentDateKey} from '../utils/dates';

export default ({date: dateProp, logId}) => {
    const userId = useSelector(selectUserId);
    const date = dateProp || currentDateKey();
    const [eventType, setEventType] = useState(null);
    const entries = useSelector(selectUserLogEntriesForDate(userId, logId, date, eventType));
    const selectFilter = (eventType) => () => setEventType(eventType);

    return (
        <Container>
            <LogDateNavigation date={date} logId={logId} />
            <Divider />
            {isEmpty(entries) && isNil(eventType) ? (
                <Message info>No entries logged today.</Message>
            ) : (
                <>
                    <LogFilter eventType={eventType} selectFilter={selectFilter}/>
                    <Log logEntries={entries} logId={logId} />
                </>
            )}
        </Container>
    );
};
