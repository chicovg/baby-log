import React from 'react';
import {Card, Statistic} from 'semantic-ui-react';

export default ({averages, unit, totals}) => (
    <Card.Content>
        <Statistic.Group size='mini' widths='four'>
            <Statistic color='green'>
                <Statistic.Value>{averages.feedings}</Statistic.Value>
                <Statistic.Label>feedings<br />per day</Statistic.Label>
            </Statistic>
            <Statistic color='brown'>
                <Statistic.Value>{averages.diapers}</Statistic.Value>
                <Statistic.Label>diapers<br />per day</Statistic.Label>
            </Statistic>
            <Statistic color='blue'>
                <Statistic.Value >{averages.drank}</Statistic.Value>
                <Statistic.Label>{unit} bottle fed<br />per day</Statistic.Label>
            </Statistic>
            <Statistic color='teal'>
                <Statistic.Value>{totals.net}</Statistic.Value>
                <Statistic.Label>{unit}<br />net pumped</Statistic.Label>
            </Statistic>
        </Statistic.Group>
    </Card.Content>
);
