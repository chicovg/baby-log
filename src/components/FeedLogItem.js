import React from 'react';
import { Table } from 'semantic-ui-react';

import {
    EVENT,
    FEEDING,
} from '../utils/constants';
import getDisplayValue from '../utils/getDisplayValue';

function getBreastOrBottle({ event, feeding, breast }) {
    if (event !== EVENT.FEEDING) {
        return '';
    }

    return feeding === FEEDING.BREAST
        ? getDisplayValue(breast)
        : getDisplayValue(feeding);
}

function getDurationOrAmount({ feeding, duration, amount }) {
    if (!feeding) {
        return '';
    }
    return feeding === FEEDING.BREAST
        ? `${ duration } minutes`
        : `${ amount } oz.`;
}

function FeedLogItem({
    date,
    time,
    mood,
    event,
    feeding,
    breast,
    duration,
    amount,
    diaper,
}) {
    const breastOrBottle = getBreastOrBottle({
        event,
        feeding,
        breast,
    });

    const durationOrAmount = getDurationOrAmount({
        feeding,
        duration,
        amount,
    });

    return (
        <Table.Row key={ time }>
          <Table.Cell>{ time }</Table.Cell>
          <Table.Cell>{ breastOrBottle }</Table.Cell>
          <Table.Cell>{ durationOrAmount }</Table.Cell>
          <Table.Cell>{ getDisplayValue(diaper) }</Table.Cell>
          <Table.Cell>{ mood }</Table.Cell>
        </Table.Row>
    );
}

export default FeedLogItem;
