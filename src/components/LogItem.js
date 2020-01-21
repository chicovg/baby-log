import React from 'react';
import {Link} from 'react-router-component';
import {Icon, Table} from 'semantic-ui-react';

import {EVENT, FEEDING} from '../utils/constants';
import getDisplayValue from '../utils/getDisplayValue';
import {toDisplayedEntry} from '../utils/entries';
import {editEntry, deleteEntry} from '../utils/locations';

const getEventDetails = ({amount, breast, duration, event, feeding, unit}) => {
    switch (event) {
        case EVENT.FEEDING:
            return feeding === FEEDING.BREAST
                ? `${getDisplayValue(breast)} breast, ${duration} minutes`
                : `${getDisplayValue(feeding)}, ${amount} ${unit}`;
        case EVENT.PUMPING:
            return `${getDisplayValue(event)} ${amount} ${unit}`;
        default:
            return '';
    }
};

export default (props) => {
    const entry = toDisplayedEntry(props);
    const {date, diaper, id, logId, mood, notes, time} = entry;

    return (
        <Table.Row key={id}>
            <Table.Cell>{time}</Table.Cell>
            <Table.Cell>{getEventDetails(entry)}</Table.Cell>
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
};
