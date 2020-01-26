import React from 'react';
import {Card, Table} from 'semantic-ui-react';
import {Link} from 'react-router-component';
import {toSummaryDisplayDate} from '../utils/dates';
import {viewEntriesForDate} from '../utils/locations';

export default ({logId, summaries, unit}) => {
    return (
        <Card.Content extra className='daily-summary'>
            <Table compact='very' striped>
                <Table.Header>
                    <Table.Row key='header'>
                        <Table.HeaderCell>Date</Table.HeaderCell>
                        <Table.HeaderCell>Feedings</Table.HeaderCell>
                        <Table.HeaderCell>Diapers</Table.HeaderCell>
                        <Table.HeaderCell>Pumped ({unit})</Table.HeaderCell>
                        <Table.HeaderCell>Bottle Fed ({unit})</Table.HeaderCell>
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
