import React from 'react';
import {Table} from 'semantic-ui-react';

import LogItem from './LogItem';
import LogTitle from './LogTitle';

export default ({logEntries, logId}) => (
    <Table celled striped>
        <Table.Header>
            <LogTitle />
        </Table.Header>
        <Table.Body>
            {logEntries.map(entry => (
                <LogItem key={entry.id} logId={logId} {...entry} />
            ))}
        </Table.Body>
    </Table>
);
