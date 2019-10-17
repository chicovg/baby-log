import React, { Fragment } from 'react';
import { Divider } from 'semantic-ui-react';
import { Location, Locations } from 'react-router-component';
import { useSelector } from 'react-redux';
import { isLoaded, isEmpty, useFirebase } from 'react-redux-firebase';

import AddEntryPage from './AddEntryPage';
import AppHeader from './AppHeader';
import AppLoader from './AppLoader';
import DeleteEntryPage from './DeleteEntryPage';
import EditEntryPage from './EditEntryPage';
import LogPage from './LogPage';
import LogSummaryPage from './LogSummaryPage';

function Layout() {
    const firebase = useFirebase();
    const auth = useSelector(state => state.firebase.auth);
    const userId = auth.uid;

    if (isLoaded(auth) && isEmpty(auth)) {
        firebase.login({
            provider: 'google',
            type: 'popup',
        });
    }

    return (
        <Fragment>
          <AppHeader />
          <Divider />
          <AppLoader
            isSignedIn={ !isEmpty(auth) }
            isLoading={ !userId }
          />
          {
              isLoaded(auth) && !isEmpty(auth)
              ? <Locations hash>
                      <Location path="/" handler={ LogSummaryPage } />
                      <Location path="/logs/:logId/entries" handler={ LogPage } />
                      <Location path="/logs/:logId/entries/:date" handler={ LogPage } />
                      <Location path="/logs/:logId/add-entry/:date" handler={ AddEntryPage } />
                      <Location path="/logs/:logId/edit-entry/:id" handler={ EditEntryPage } />
                      <Location path="/logs/:logId/delete-entry/:date/:id" handler={ DeleteEntryPage } />
                    </Locations>
              : null
          }
        </Fragment>
    );
}

export default Layout;
