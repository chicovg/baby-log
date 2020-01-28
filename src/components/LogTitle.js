import React from 'react';
import {Table} from 'semantic-ui-react';

export default () => (
    <Table.Row>
        <Table.HeaderCell width='two'>Time</Table.HeaderCell>
        <Table.HeaderCell width='two'>Event</Table.HeaderCell>
        <Table.HeaderCell width='four'>Details</Table.HeaderCell>
        <Table.HeaderCell width='two'>Mood</Table.HeaderCell>
        <Table.HeaderCell width='four'>Notes</Table.HeaderCell>
        <Table.HeaderCell>Actions</Table.HeaderCell>
    </Table.Row>
);
