import React from 'react';
import { Location, Locations } from 'react-router-component';
import { Container, Divider, Header } from 'semantic-ui-react';

import './App.css';
import CurrentLogPage from './components/CurrentLogPage';
import LogPage from './components/LogPage';
import LogEntryPage from './components/LogEntryPage';

function App() {
    return (
        <div className="App-main">
          <Container>
            <Header as="h1">Baby Log</Header>
          </Container>
          <Divider />
          <Locations hash>
            <Location path="/" handler={ CurrentLogPage }/>
            <Location path="/log/new" handler={ LogEntryPage }/>
            <Location path="/log/:date" handler={ LogPage } />
          </Locations>
        </div>
    );
}

export default App;
