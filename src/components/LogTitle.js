import React from 'react';
import {Table} from 'semantic-ui-react';

export default () => (
    <Table.Row>
        <Table.HeaderCell width="two">Time</Table.HeaderCell>
        <Table.HeaderCell width="four">Feeding/Pumping</Table.HeaderCell>
        <Table.HeaderCell width="two">Diaper</Table.HeaderCell>
        <Table.HeaderCell width="one">Mood</Table.HeaderCell>
        <Table.HeaderCell>Notes</Table.HeaderCell>
        <Table.HeaderCell width="two">Actions</Table.HeaderCell>
    </Table.Row>
);
