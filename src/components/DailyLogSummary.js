import React from 'react';
import {Card, Table} from 'semantic-ui-react';
import {Link} from 'react-router-component';
import {toSummaryDisplayDate} from '../utils/dates';
import {viewEntriesForDate} from '../utils/locations';
import isEmpty from 'lodash/fp/isEmpty';

export default ({logId, summaries, unit}) => {
    if (isEmpty(summaries)) {
        return null;
    }

    return (
        <Card.Content extra className='daily-summary'>
            <Card.Header>Recent History</Card.Header>
            <Table compact='very' striped>
                <Table.Header>
                    <Table.Row key='header'>
                        <Table.HeaderCell>Date</Table.HeaderCell>
                        <Table.HeaderCell>Feedings</Table.HeaderCell>
                        <Table.HeaderCell>Diapers</Table.HeaderCell>
                        <Table.HeaderCell>Pumped ({unit})</Table.HeaderCell>
                        <Table.HeaderCell>Drank ({unit})</Table.HeaderCell>
                        <Table.HeaderCell>Net ({unit})</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {summaries.map(({id, diapers, feedings, pumped, drank, net}) => (
                        <Table.Row key={id}>
                            <Table.Cell>
                                <Link href={viewEntriesForDate.link(logId, id)}>
                                    {toSummaryDisplayDate(id)}
                                </Link>
                            </Table.Cell>
                            <Table.Cell>{feedings}</Table.Cell>
                            <Table.Cell>{diapers}</Table.Cell>
                            <Table.Cell>{pumped}</Table.Cell>
                            <Table.Cell>{drank}</Table.Cell>
                            <Table.Cell>{net}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </Card.Content>
    );
};
