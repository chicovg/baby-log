import React from 'react';
import {Provider} from 'react-redux';
import 'semantic-ui-css/semantic.css';
import {Container} from 'semantic-ui-react';

import {generateEntries, mockStore, logId} from './fixtures';
import {LogPage} from '../components';

const withWrappers = (store) => (component) => () => (
    <Provider store={store}>
        <Container>{component}</Container>
    </Provider>
);

const entries = generateEntries({seed: 'LogPage'});

export const Default = withWrappers(mockStore({entries}))(
    <LogPage date='2020-01-01' logId={logId} />
);

export const NoData = withWrappers(mockStore({entries: []}))(
    <LogPage date='2019-12-31' logId={logId} />
);

export default {
    title: 'LogPage',
    component: LogPage,
};
