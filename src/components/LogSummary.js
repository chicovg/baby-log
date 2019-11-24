import React from 'react';
import {Card} from 'semantic-ui-react';
import {useSelector} from 'react-redux';

import {selectLastUserLogDate, selectUserLogSummaries, selectUserId} from '../redux/selectors';
import {currentDateKey, previousDateKey} from '../utils/dates';
import DailyLogSummary from './DailyLogSummary';
import LogSummaryActions from './LogSummaryActions';
import LogSummaryHeader from './LogSummaryHeader';
import './LogSummary.css';

const getLastDateInfo = lastDate => ({
    lastDate,
    lastWasToday: currentDateKey() === lastDate,
    lastWasYesterday: previousDateKey(currentDateKey()) === lastDate
});

const LogSummary = ({id, title}) => {
    const userId = useSelector(selectUserId);
    const lastDate = useSelector(selectLastUserLogDate(userId, id));
    const dailySummaries = useSelector(selectUserLogSummaries(userId, id));
    const lastDateInfo = getLastDateInfo(lastDate);

    return (
        <Card>
            <LogSummaryHeader lastDateInfo={lastDateInfo} title={title} />
            <DailyLogSummary logId={id} summaries={dailySummaries} />
            <LogSummaryActions logId={id} />
        </Card>
    );
};

export default LogSummary;
