import React from 'react';
import {Link} from 'react-router-component';
import {Icon, Table} from 'semantic-ui-react';

import {EVENT, FEEDING} from '../utils/constants';
import getDisplayValue from '../utils/getDisplayValue';
import {toDisplayedEntry} from '../utils/entries';
import {editEntry, deleteEntry} from '../utils/locations';

function getBreastOrBottle({event, feeding, breast}) {
    if (event !== EVENT.FEEDING) {
        return '';
    }

    return feeding === FEEDING.BREAST ? getDisplayValue(breast) : getDisplayValue(feeding);
}

function getDurationOrAmount({feeding, duration, amount}) {
    if (!feeding) {
        return '';
    }

    return feeding === FEEDING.BREAST ? `${duration} minutes` : `${amount}`;
}

function LogItem(props) {
    const {
        amount,
        breast,
        date,
        diaper,
        duration,
        event,
        feeding,
        id,
        logId,
        mood,
        notes,
        time
    } = toDisplayedEntry(props);

    const breastOrBottle = getBreastOrBottle({
        event,
        feeding,
        breast
    });

    const durationOrAmount = getDurationOrAmount({
        feeding,
        duration,
        amount
    });

    return (
        <Table.Row key={id}>
            <Table.Cell>{time}</Table.Cell>
            <Table.Cell>{breastOrBottle}</Table.Cell>
            <Table.Cell>{durationOrAmount}</Table.Cell>
            <Table.Cell>{getDisplayValue(diaper)}</Table.Cell>
            <Table.Cell>{mood}</Table.Cell>
            <Table.Cell>{notes}</Table.Cell>
            <Table.Cell>
                <Link href={editEntry.link(logId, id)}>
                    <Icon name="edit" />
                    Edit
                </Link>{' '}
                <Link href={deleteEntry.link(logId, date, id)}>
                    <Icon name="delete" />
                    Delete
                </Link>
            </Table.Cell>
        </Table.Row>
    );
}

export default LogItem;
