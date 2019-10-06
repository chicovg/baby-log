import React from 'react';
import { Container } from 'semantic-ui-react';

import useBabyLogState from '../useBabyLogState';
import LogDateNavigation from './LogDateNavigation';
import FeedLog from './FeedLog';

function LogPage({ date }) {
    const [getLogEntries] = useBabyLogState();

    return (
        <Container>
          <LogDateNavigation date={ date } />
          <FeedLog logEntries={ getLogEntries(date) }/>
        </Container>
    );
}

export default LogPage;
