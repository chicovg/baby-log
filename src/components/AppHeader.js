import React from 'react';
import {Container, Header} from 'semantic-ui-react';

import {goTo, home} from '../utils/locations';

function AppHeader() {
    return (
        <Container>
            <Header as="h1" onClick={() => goTo(home.link())}>
                Baby Log
            </Header>
        </Container>
    );
}

export default AppHeader;
