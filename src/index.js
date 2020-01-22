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

const firebaseConfig = {
    apiKey: 'AIzaSyAKC-8jmwF8GbovrWXDyeOu7PQTf45SxyI',
    authDomain: 'baby-log-255211.firebaseapp.com',
    databaseURL: 'https://baby-log-255211.firebaseio.com',
    projectId: 'baby-log-255211',
    storageBucket: 'baby-log-255211.appspot.com',
    messagingSenderId: '773291577572',
    appId: '1:773291577572:web:7a63fef5cd3fda98e0dcf1',
};
const rrfConfig = {};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    firebase.firestore();
}

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [
    thunk.withExtraArgument({getFirebase, getFirestore}),
];

const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(...middlewares),
        reduxFirestore(firebase, rrfConfig),
    ),
);

const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance,
};

render(
    <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
            <App />
        </ReactReduxFirebaseProvider>
    </Provider>,
    document.getElementById('root')
);
