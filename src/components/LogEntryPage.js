import React from 'react';
import { Container } from 'semantic-ui-react';

import useBabyLogState from '../useBabyLogState';
import LogEntryForm from './LogEntryForm';

function LogEntryPage() {
    const [ , addLogEntryForDate] = useBabyLogState();

    return (
        <Container>
          <LogEntryForm addLogEntryForDate={ addLogEntryForDate }/>
        </Container>
    );
}

export default LogEntryPage;
