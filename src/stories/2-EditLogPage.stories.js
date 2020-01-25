import React from 'react';
import {Provider} from 'react-redux';
import 'semantic-ui-css/semantic.css';
import {Container} from 'semantic-ui-react';

import {mockStore, log, logId} from './fixtures';
import EditLogPage from '../components/EditLogPage';

const withWrappers = (store) => (component) => () => (
    <Provider store={store}>
        <Container>{component}</Container>
    </Provider>
);

const logs = {
    [logId]: log,
};

export const Default = withWrappers(mockStore({logs}))(<EditLogPage logId={logId} />);

export default {
    title: 'EditLogPage',
    component: EditLogPage,
};
