import React from 'react';
import {Provider} from 'react-redux';
import 'semantic-ui-css/semantic.css';
import {Container} from 'semantic-ui-react';

import {generateEntries, mockStore, log} from './fixtures';
import LogSummary from '../components/LogSummary';

const withWrappers = (store) => (component) => () => (
      <Provider store={store}>
        <Container>{component}</Container>
      </Provider>
);

const entries = generateEntries({seed: 'LogSummary'});

export const Default = withWrappers(mockStore({entries}))(<LogSummary {...log} />);

export const NoData = withWrappers(mockStore({}))(<LogSummary {...log} />);

export default {
    title: 'LogSummary',
    component: LogSummary,
};
