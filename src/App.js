import React, { Component } from 'react';
import { Location, Locations } from 'react-router-component';
import { Divider } from 'semantic-ui-react';

import './App.css';
import AppHeader from './components/AppHeader';
import CurrentLogPage from './components/CurrentLogPage';
import LogPage from './components/LogPage';
import LogEntryPage from './components/LogEntryPage';
import { getLogEntries, listenToAuth, signIn } from './firebaseUtils';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firestoreError: null,
            loaded: false,
            loading: true,
            token: null,
            user: null,
            signInError: null,
        };
    }

    componentDidMount() {
        listenToAuth((user) => this.setState({ user }));

        signIn(
            result => console.log(result),
            signInError => this.setState({ signInError }),
        );
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.user) {
            getLogEntries(
                this.state.userId,
                logEntries => this.setState({ logEntries }),
                firestoreError => this.setState({ firestoreError })
            );
        }
    }

    render() {
        return (
            <div className="App-main">
              <AppHeader />
              <Divider />
              <pre>{ JSON.stringify(this.state.logEntries) }</pre>
              <Locations hash>
                <Location path="/" handler={ CurrentLogPage }/>
                <Location path="/log/new" handler={ LogEntryPage }/>
                <Location path="/log/:date" handler={ LogPage } />
              </Locations>
            </div>
        );
    };
}

export default App;
