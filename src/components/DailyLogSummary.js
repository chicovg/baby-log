import React from 'react';
import {Card, Table} from 'semantic-ui-react';
import {toSummaryDisplayDate} from '../utils/dates';

export default ({summaries}) => (
    <Card.Content extra>
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
                        <Table.Cell>{toSummaryDisplayDate(id)}</Table.Cell>
                        <Table.Cell>{diapers}</Table.Cell>
                        <Table.Cell>{feedings}</Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    </Card.Content>
);
