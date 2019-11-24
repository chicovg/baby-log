import React, {
    Fragment
} from 'react';
import {
    Divider
} from 'semantic-ui-react';
import {
    useSelector
} from 'react-redux';
import {
    isLoaded,
    isEmpty,
    useFirebase,
    useFirestoreConnect
} from 'react-redux-firebase';

import AppHeader from './AppHeader';
import AppLoader from './AppLoader';
import AppLocations from './AppLocations';
import {
    selectAuth,
    selectDataRequested
} from '../redux/selectors';

const Layout = () => {
    const firebase = useFirebase();
    const auth = useSelector(selectAuth);
    const userId = auth.uid;

    if (isLoaded(auth) && isEmpty(auth)) {
        firebase.login({
            provider: 'google',
            type: 'redirect',
        });
    }

    const logsQuery = `users/${userId}/logs`;
    const entriesQuery = `users/${userId}/entries`;

    useFirestoreConnect([
        logsQuery,
        entriesQuery,
    ], [userId]);

    const logsRequested = useSelector(selectDataRequested(logsQuery));
    const entriesRequested = useSelector(selectDataRequested(entriesQuery));
    const loaded = logsRequested && entriesRequested;

    return (
        <Fragment>
          <AppHeader />
          <Divider />
          <AppLoader
            isSignedIn={ !isEmpty(auth) }
            isLoading={ !loaded }
          />
          <AppLocations isLoaded={ loaded } />
        </Fragment>
    );
};

export default Layout;
