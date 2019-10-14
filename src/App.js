import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Location, Locations } from 'react-router-component';
import { Divider } from 'semantic-ui-react';

import './App.css';

import Layout from './components/Layout';

function App () {
    return (
        <div className="App-main">
          <Layout />
        </div>
    );
}

export default App;
