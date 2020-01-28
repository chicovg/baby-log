import React from 'react';
import {Provider} from 'react-redux';
import {Container} from 'semantic-ui-react';

import {mockStore} from './fixtures';

export const withWrappers = (store = mockStore({})) => (component) => () => (
    <Provider store={store}>
        <Container>{component}</Container>
    </Provider>
);
