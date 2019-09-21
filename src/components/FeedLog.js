import React from 'react';
import { Table } from 'semantic-ui-react';

import FeedLogItem from './FeedLogItem';
import FeedLogTitle from './FeedLogTitle';

function FeedLog({logEntries}) {
    const logItems = logEntries.map(FeedLogItem);

    return (
      <Table celled>
        <Table.Header>
          <FeedLogTitle />
        </Table.Header>
        <Table.Body>
          { logItems }
        </Table.Body>
      </Table>
    );
}

export default FeedLog;
