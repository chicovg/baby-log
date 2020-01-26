import React, { Fragment, useEffect} from 'react';
import {Divider} from 'semantic-ui-react';
import {useSelector, useDispatch} from 'react-redux';
import {isLoaded, isEmpty, useFirestoreConnect} from 'react-redux-firebase';

import AppHeader from './AppHeader';
import AppLoader from './AppLoader';
import AppLocations from './AppLocations';
import {loginToFirebase} from '../actions';
import {selectAuth, selectDataRequested} from '../selectors';
import {logs, logEntries} from '../firestore/queries';

export default () => {
    const auth = useSelector(selectAuth);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isLoaded(auth) && isEmpty(auth)) {
            dispatch(loginToFirebase);
        }
    }, [auth, dispatch]);

    const userId = auth.uid;
    const logsQuery = logs(userId);
    const entriesQuery = logEntries(userId);

    useFirestoreConnect([logsQuery, entriesQuery], [userId]);

    const logsRequested = useSelector(selectDataRequested(logsQuery));
    const entriesRequested = useSelector(selectDataRequested(entriesQuery));
    const loaded = logsRequested && entriesRequested;

    return (
        <Fragment>
            <AppHeader />
            <Divider />
            <AppLoader isSignedIn={!isEmpty(auth)} isLoading={!loaded} />
            <AppLocations isLoaded={loaded} />
        </Fragment>
    );
};
