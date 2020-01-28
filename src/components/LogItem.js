import React from 'react';
import {useDispatch} from 'react-redux';
import {Button, Icon, Table} from 'semantic-ui-react';

import {goToDeleteEntry, goToEditEntry} from '../actions';
import {useDisplayFormat} from '../hooks';
import {toDisplayedEntry} from '../utils/entries';

export default (props) => {
    const {formatEvent, formatEventDetails} = useDisplayFormat();
    const entry = toDisplayedEntry(props);
    const {date, id, logId, mood, notes, time} = entry;
    const dispatch = useDispatch();

    return (
        <Table.Row>
            <Table.Cell>{time}</Table.Cell>
            <Table.Cell>{formatEvent(entry)}</Table.Cell>
            <Table.Cell>{formatEventDetails(entry)}</Table.Cell>
            <Table.Cell>{mood}</Table.Cell>
            <Table.Cell>{notes}</Table.Cell>
            <Table.Cell>
                <Button basic icon onClick={() => dispatch(goToEditEntry(logId, id))} size='mini'>
                    <Icon name='edit' />
                    Edit
                </Button>
                <Button
                    basic
                    icon
                    onClick={() => dispatch(goToDeleteEntry(logId, date, id))}
                    size='mini'
                >
                    <Icon name='delete' />
                    Del.
                </Button>
            </Table.Cell>
        </Table.Row>
    );
};
