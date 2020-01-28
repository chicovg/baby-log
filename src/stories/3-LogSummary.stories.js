import React from 'react';
import 'semantic-ui-css/semantic.css';

import {withWrappers} from './common';
import {generateEntries, mockStore, log} from './fixtures';
import LogSummary from '../components/LogSummary';

const entries = generateEntries({seed: 'LogSummary'});

export const Default = withWrappers(mockStore({entries}))(<LogSummary {...log} />);

export const NoData = withWrappers(mockStore({}))(<LogSummary {...log} />);

export default {
    title: 'LogSummary',
    component: LogSummary,
};
