import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

function getLoaderMessage(isSignedIn) {
    if (!isSignedIn) {
        return 'Signing In...';
    }

    return 'Loading...';
}

function AppLoader({ isSignedIn, isLoading }) {

    if (!isLoading) {
        return null;
    }

    const loaderMessage = getLoaderMessage(isSignedIn, isLoading);

    return (
        <Dimmer active>
          <Loader>{ loaderMessage }</Loader>
        </Dimmer>
    );
}

export default AppLoader;
