import React from 'react';
import {Card, Table} from 'semantic-ui-react';
import {Link} from 'react-router-component';
import {toSummaryDisplayDate} from '../utils/dates';
import {viewEntriesForDate} from '../utils/locations';

export default ({logId, summaries}) => (
    <Card.Content extra>
        <Card.Header>Recent History</Card.Header>
        <Table compact="very" striped>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Date</Table.HeaderCell>
                    <Table.HeaderCell>Feedings</Table.HeaderCell>
                    <Table.HeaderCell>Diapers</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {summaries.map(({id, diapers, feedings}) => (
                    <Table.Row id={id}>
                        <Table.Cell>
                            <Link href={viewEntriesForDate.link(logId, id)}>
                                {toSummaryDisplayDate(id)}
                            </Link>
                        </Table.Cell>
                        <Table.Cell>{diapers}</Table.Cell>
                        <Table.Cell>{feedings}</Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    </Card.Content>
);
