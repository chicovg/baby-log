import React from 'react';
import {Card} from 'semantic-ui-react';
import {useSelector} from 'react-redux';

import {selectLastUserLogDate, selectUserLogSummaries, selectUserId} from '../selectors';
import DailyLogSummary from './DailyLogSummary';
import LogSummaryActions from './LogSummaryActions';
import LogSummaryHeader from './LogSummaryHeader';
import './LogSummary.css';

const LogSummary = ({id, title}) => {
    const userId = useSelector(selectUserId);
    const lastDate = useSelector(selectLastUserLogDate(userId, id));
    const dailySummaries = useSelector(selectUserLogSummaries(userId, id));

    return (
        <Card fluid>
            <LogSummaryHeader lastDate={lastDate} title={title} />
            <DailyLogSummary logId={id} summaries={dailySummaries} />
            <PumpingSummary logId={id} />
            <LogSummaryActions logId={id} />
        </Card>
    );
};

export default LogSummary;
