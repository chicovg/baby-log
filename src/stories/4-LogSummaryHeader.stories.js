import React from 'react';
import {Card} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.css';

import {currentDateKey, previousDateKey} from '../utils/dates';
import LogSummaryHeader from '../components/LogSummaryHeader';

const withCard = (component) => () => <Card>{component}</Card>

export const NoLogs = withCard(<LogSummaryHeader title='My Log' />);

export const LastLoggedToday = withCard(
    <LogSummaryHeader
        lastDate={currentDateKey()}
        title='My Log'
    />
);

export const LastLoggedYesterday = withCard(
    <LogSummaryHeader
        lastDate={previousDateKey(currentDateKey())}
        title='My Log'
    />
);

export const LastLoggedBeforeYesterday = withCard(
    <LogSummaryHeader
        lastDate={previousDateKey(previousDateKey(currentDateKey()))}
        title='My Log'
    />
);

export default {
    title: 'LogSummaryHeader',
    component: LogSummaryHeader,
};
