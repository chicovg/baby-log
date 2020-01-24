import React from 'react';
import {Table} from 'semantic-ui-react';

export default () => (
    <Table.Row>
        <Table.HeaderCell width="two">Time</Table.HeaderCell>
        <Table.HeaderCell width="five">Event</Table.HeaderCell>
        <Table.HeaderCell width="two">Mood</Table.HeaderCell>
        <Table.HeaderCell>Notes</Table.HeaderCell>
        <Table.HeaderCell width="two">Actions</Table.HeaderCell>
    </Table.Row>
);
