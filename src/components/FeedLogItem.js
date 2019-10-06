import React from 'react';
import { Table } from 'semantic-ui-react';

function FeedLogItem({
    time,
    breastOrBottle,
    durationOrAmount,
    diaper,
    mood,
    comments,
}) {
    return (
        <Table.Row key={ time }>
          <Table.Cell>{ time }</Table.Cell>
          <Table.Cell>{ breastOrBottle }</Table.Cell>
          <Table.Cell>{ durationOrAmount }</Table.Cell>
          <Table.Cell>{ diaper }</Table.Cell>
          <Table.Cell>{ mood }</Table.Cell>
          <Table.Cell>{ comments }</Table.Cell>
        </Table.Row>
    );
}

export default FeedLogItem;
