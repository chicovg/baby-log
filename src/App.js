import React from 'react';
import { Container, Divider, Header } from 'semantic-ui-react';

import './App.css';
import useBabyLogState from './useBabyLogState';
import LogDateNavigation from './components/LogDateNavigation';
import FeedLog from './components/FeedLog';

function App() {
    const date = "2019-11-01";

    const [getLogEntries] = useBabyLogState();

    return (
        <div>
          <Container className="App-main">
            <Header as="h1">Baby Log</Header>
          </Container>
          <Divider />
          <Container>
            <LogDateNavigation date={ date } />
            <FeedLog logEntries={ getLogEntries(date) }/>
          </Container>
        </div>
    );
}

export default App;
