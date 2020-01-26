import React from 'react';
import {Provider} from 'react-redux';
import 'semantic-ui-css/semantic.css';
import {Container} from 'semantic-ui-react';

import {mockStore} from './fixtures';
import {CreateEntryPage} from '../components';

const logId = 'log1234';

const withWrappers = (component) => () => (
    <Provider store={mockStore({})}>
        <Container>{component}</Container>
    </Provider>
);

export const Default = withWrappers(
    <CreateEntryPage logId={logId} date='2020-01-01' />
);

export default {
    title: 'CreateEntryPage',
    component: CreateEntryPage,
};
