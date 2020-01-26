import React from 'react';
import {Link} from 'react-router-component';
import {Icon, Table} from 'semantic-ui-react';

import {useDisplayFormat} from '../hooks';
import {toDisplayedEntry} from '../utils/entries';
import {editEntry, deleteEntry} from '../utils/locations';

export default (props) => {
    const {formatEvent, formatEventDetails} = useDisplayFormat();
    const entry = toDisplayedEntry(props);
    const {date, id, logId, mood, notes, time} = entry;

    return (
        <Table.Row>
            <Table.Cell>{time}</Table.Cell>
            <Table.Cell>{formatEvent(entry)}</Table.Cell>
            <Table.Cell>{formatEventDetails(entry)}</Table.Cell>
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
