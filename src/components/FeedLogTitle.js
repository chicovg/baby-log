import React from 'react';
import { Table } from 'semantic-ui-react';

function FeedLogTitle() {
    return (
      <Table.Row>
        <Table.HeaderCell>Time</Table.HeaderCell>
        <Table.HeaderCell>Breast or Bottle</Table.HeaderCell>
        <Table.HeaderCell>Amount or Duration</Table.HeaderCell>
        <Table.HeaderCell>Diaper</Table.HeaderCell>
        <Table.HeaderCell>Mood</Table.HeaderCell>
      </Table.Row>
    );
}

export default FeedLogTitle;
