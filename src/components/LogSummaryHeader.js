import React from 'react';
import {Card} from 'semantic-ui-react';
import {toShortDisplayDate} from '../utils/dates';

const getLogMetaInfo = ({lastDate, lastWasToday, lastWasYesterday}) => {
    if (!lastDate) {
        return "You haven't logged yet";
    }

    if (lastWasToday) {
        return 'The last entry was today';
    }

    if (lastWasYesterday) {
        return 'The last entry was yesterday';
    }

    return `The last entry was on ${toShortDisplayDate(lastDate)}`;
};

export default ({lastDateInfo, title}) => {
    return (
        <Card.Content>
            <Card.Header>{title}</Card.Header>
            <Card.Meta>{getLogMetaInfo(lastDateInfo)}</Card.Meta>
        </Card.Content>
    );
};
