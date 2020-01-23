import React from 'react';
import {Container, Header} from 'semantic-ui-react';

import {goTo, home} from '../utils/locations';

export default () => (
    <Container>
        <Header as='h1' onClick={() => goTo(home.link())}>
            Baby Log
        </Header>
    </Container>
);
