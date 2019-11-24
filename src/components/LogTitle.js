import React from 'react';
import {Table} from 'semantic-ui-react';

function LogTitle() {
    return (
        <Table.Row>
            <Table.HeaderCell width="two">Time</Table.HeaderCell>
            <Table.HeaderCell width="two">Breast or Bottle</Table.HeaderCell>
            <Table.HeaderCell width="two">Amount or Duration</Table.HeaderCell>
            <Table.HeaderCell width="two">Diaper</Table.HeaderCell>
            <Table.HeaderCell width="one">Mood</Table.HeaderCell>
            <Table.HeaderCell>Notes</Table.HeaderCell>
            <Table.HeaderCell width="two">Actions</Table.HeaderCell>
        </Table.Row>
    );
}

export default LogTitle;
