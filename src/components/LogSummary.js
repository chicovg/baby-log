import React, {Fragment} from 'react';
import {Card} from 'semantic-ui-react';
import {useSelector} from 'react-redux';
import isEmpty from 'lodash/fp/isEmpty';

import {selectLastUserLogDate, selectUserLogSummaries, selectUserId} from '../selectors';
import DailyLogSummary from './DailyLogSummary';
import LogSummaryActions from './LogSummaryActions';
import LogSummaryHeader from './LogSummaryHeader';
import LogTotals from './LogTotals';
import './LogSummary.css';

const LogSummary = ({id, title, unit}) => {
    const userId = useSelector(selectUserId);
    const lastDate = useSelector(selectLastUserLogDate(userId, id));
    const {averages, dailySummaries, totals} = useSelector(selectUserLogSummaries(userId, id));

    return (
        <Card fluid>
            <LogSummaryHeader lastDate={lastDate} title={title} />
            {isEmpty(dailySummaries) ? null : (
                <Fragment>
                    <Card.Content>
                        <Card.Header>Recent History (past week)</Card.Header>
                    </Card.Content>
                    <LogTotals averages={averages} totals={totals} unit={unit} />
                    <DailyLogSummary logId={id} summaries={dailySummaries} unit={unit} />
                </Fragment>
            )}
            <LogSummaryActions logId={id} />
        </Card>
    );
};

export default LogSummary;
