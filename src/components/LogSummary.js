import React from 'react';
import { compose } from 'redux';
import { Button, Card } from 'semantic-ui-react';
import { useSelector } from 'react-redux';

import { selectLastUserLogDate, selectUserLogEntries, selectUserId } from '../redux/selectors';
import { EVENT } from '../utils/constants';
import { currentDateKey, previousDateKey, toShortDisplayDate } from '../utils/dates';
import { logEntriesById } from '../firestore/queries';
import { editLog, deleteLog, goTo, viewEntries } from '../utils/locations';
import './LogSummary.css';

const getLastDateInfo = lastDate => ({
    lastDate,
    lastWasToday: currentDateKey() === lastDate,
    lastWasYesterday: previousDateKey(currentDateKey()) === lastDate,
});

const getLogMetaInfo = ({ lastDate, lastWasToday, lastWasYesterday }) => {
    if (!lastDate) {
        return 'You haven\'t logged yet';
    }

    if (lastWasToday) {
        return 'The last entry was today';
    }

    if (lastWasYesterday) {
        return 'The last entry was yesterday';
    }

    return `The last entry was on ${toShortDisplayDate(lastDate)}`;
};

const calculateInsights = entriesForDate => {
    let emptyInsights = {
        diapers: 0,
        feedings: 0,
    };

    return entriesForDate.reduce(
        ({ diapers, feedings }, { event }) => {
            return event === EVENT.DIAPER
                ? {
                    diapers: diapers + 1,
                    feedings
                }
                : {
                    diapers,
                    feedings: feedings + 1,
                };
        },
        emptyInsights
    );
};

const getLastDateText = ({ lastDate, lastWasToday, lastWasYesterday}) =>
      lastWasToday
          ? 'Today, '
          : lastWasYesterday
          ? 'Yesterday, '
          : `On ${toShortDisplayDate(lastDate)}, `;

const getDescriptionInfo = babyName => ({ diapers, feedings }) =>
      `${babyName} ate ${feedings} time(s) and used ${diapers} diaper(s).`;

const defaultDescription = 'Add some entries to start keeping track!';

const LogActions = ({ logId }) => {
    return (
        <Button.Group>
          <Button
            basic
            color='blue'
            compact
            content='View'
            icon='eye'
            onClick={ () => goTo(viewEntries.link(logId)) }
          />
          <Button
            basic
            color='green'
            compact
            content='Edit'
            icon='edit'
            onClick={ () => goTo(editLog.link(logId)) }
          />
          <Button
            basic
            color='red'
            compact
            content='Delete'
            icon='trash'
            onClick={ () => goTo(deleteLog.link(logId)) }
          />
        </Button.Group>
    );
};

const LogSummary = ({ id, babyName, title }) => {
    const userId = useSelector(selectUserId);
    const lastDate = useSelector(selectLastUserLogDate(userId, id));
    const entriesForDate = useSelector(selectUserLogEntries(userId, id, lastDate));
    const metaInfo = compose(
        getLogMetaInfo,
        getLastDateInfo
    )(lastDate);
    const lastDateText = compose(
        getLastDateText,
        getLastDateInfo,
    )(lastDate);
    const descriptionInfo = lastDate
          ? compose(
              getDescriptionInfo(babyName),
              calculateInsights,
          )(entriesForDate)
          : defaultDescription;

    return (
        <Card>
          <Card.Content>
            <Card.Header>{ title }</Card.Header>
            <Card.Meta>{ metaInfo }</Card.Meta>
          </Card.Content>
          <Card.Content extra>
            { lastDate
              ? <Card.Description>{ lastDateText }</Card.Description>
              : null }
            <Card.Description>{ descriptionInfo }</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <LogActions logId={ id }/>
          </Card.Content>
        </Card>
    );
};

export default LogSummary;
