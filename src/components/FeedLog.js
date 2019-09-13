import React from 'react';
import { Table } from 'semantic-ui-react';

import FeedLogItem from './FeedLogItem';
import FeedLogTitle from './FeedLogTitle';

function FeedLog() {
    const items = [{
        time: '4am',
        breastOrBottle: 'Left/Right',
        durationOrAmount: '20min',
        mood: 'Happy',
        comments: 'Very hungry this morning!',
    }, {
        time: '6am',
        diaper: 'Wet',
        mood: 'Cranky',
    }, {
        time: '7am',
        breastOrBottle: 'Left',
        durationOrAmount: '10min',
        mood: 'Sleep',
        comments: 'Seemed full and sleepy after 10 mins, Pumped Right.',
    }, {
        time: '8am',
        diaper: 'Dirty',
    }, {
        time: '10am',
        breastOrBottle: 'Bottle',
        durationOrAmount: '4oz'
    }];

    const logItems = items.map(FeedLogItem);

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
