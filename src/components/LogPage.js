import React from 'react';
import { Container } from 'semantic-ui-react';
import { useSelector } from 'react-redux';

import LogDateNavigation from './LogDateNavigation';
import Log from './Log';
import { currentDateKey } from '../utils/dates';

const timeComparator = (e1, e2) => {
    if (e1.time < e2.time) {
        return -1;
    }
    if (e1.time > e2.time) {
        return 1;
    }
    return 0;
};

const selectLogEntries = date => state => {
    const userId = state.firebase.auth.uid;
    const users = state.firestore.data.users;

    if (!users) {
        return [];
    }

    const entriesMap = users[userId].entries;

    let entries = Object.keys(entriesMap)
        .map(key => ({
            id: key,
            ...entriesMap[key],
        }))
        .filter(entry => entry.date === date);

    entries.sort(timeComparator);

    return entries;
};

function LogPage({ date: dateProp }) {
    const date = dateProp || currentDateKey();
    const entries = useSelector(selectLogEntries(date));

    return (
        <Container>
          <LogDateNavigation date={ date } />
          <Log logEntries={ entries }/>
        </Container>
    );
}

export default LogPage;
