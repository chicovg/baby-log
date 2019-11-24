import React from 'react';
import {
    Table
} from 'semantic-ui-react';

import LogItem from './LogItem';
import LogTitle from './LogTitle';

function Log({
    logEntries,
    logId
}) {
    const logItems = logEntries.map(
        entry =>
            <LogItem
              key={entry.id}
              logId={ logId }
              { ...entry }
            />
    );

    return (
        <Table celled striped>
        <Table.Header>
          <LogTitle />
        </Table.Header>
        <Table.Body>
          { logItems }
        </Table.Body>
      </Table>
    );
}

export default Log;
