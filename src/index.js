import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import {ReactReduxFirebaseProvider, firebaseReducer, getFirebase} from 'react-redux-firebase';
import {createFirestoreInstance, firestoreReducer, reduxFirestore, getFirestore} from 'redux-firestore';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

import 'semantic-ui-css/semantic.min.css';
import './index.css';

import App from './App';

render(<App />, document.getElementById('root'));
