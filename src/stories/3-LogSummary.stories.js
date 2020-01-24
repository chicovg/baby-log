import React from 'react';
import {Provider} from 'react-redux';
import {action} from '@storybook/addon-actions';
import 'semantic-ui-css/semantic.css';
import {Container} from 'semantic-ui-react';
import floor from 'lodash/fp/floor';
import times from 'lodash/fp/times';
import seedrandom from 'seedrandom';

import LogSummary from '../components/LogSummary';

const mockStore = (entries) => ({
    getState: () => ({
        firebase: {
            auth: {
                uid: 'abc1234',
            }
        },
        firestore: {
            data: {
                users: {
                    abc1234: {
                        entries,
                    }
                }
            }
        },
    }),
    dispatch: action('dispatch', {allowFunction: true}),
    subscribe: action('subscribe', {allowFunction: true}),
});

const withWrappers = (store) => (component) => () => (
      <Provider store={store}>
        <Container>{component}</Container>
      </Provider>
);

const logId = 'yyz678';
const dates = ['2020-01-01', '2020-01-02', '2020-01-03', '2020-01-04', '2020-01-05', '2020-01-06', '2020-01-07'];
const events = ['f', 'd', 'p'];
const dateRandom = seedrandom('dates');
const eventRandom = seedrandom('events')

const defaultEntries = times((n) => ({
    id: `${n}`,
    date: dates[(floor(dateRandom() * dates.length))],
    event: events[(floor(eventRandom() * events.length))],
    logId,
}), 100).reduce((prev, curr) => ({...prev, [curr.id]: curr}), {});

export const Default = withWrappers(mockStore(defaultEntries))(
    <LogSummary id={logId} title='My Log' />
);

export const NoData = withWrappers(mockStore([]))(
    <LogSummary id={logId} title='My Log' />
);

export default {
    title: 'LogSummary',
    component: LogSummary,
};
