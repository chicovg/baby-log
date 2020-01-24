import React from 'react';
import {Provider} from 'react-redux';
import {action} from '@storybook/addon-actions';
import 'semantic-ui-css/semantic.css';
import {Container} from 'semantic-ui-react';

import {BREAST, DIAPER, EVENT, FEEDING} from '../utils/constants';
import EditEntryPage from '../components/EditEntryPage';

const userId = 'abc1234';
const logId = 'log1234';
const defaultEntryProps = {
    userId,
    logId,
    date: '2020-01-01',
};

const mockStore = {
    getState: () => ({
        firebase: {
            auth: {
                uid: userId,
            },
        },
        firestore: {
            data: {
                users: {
                    [userId]: {
                        entries: {
                            entry1: {
                                ...defaultEntryProps,
                                event: EVENT.FEEDING,
                                feeding: FEEDING.BREAST,
                                breast: BREAST.RIGHT,
                                duration: '20',
                            },
                            entry2: {
                                ...defaultEntryProps,
                                event: EVENT.FEEDING,
                                feeding: FEEDING.BOTTLE,
                                amount: 6,
                                unit: 'fl. oz.',
                            },
                            entry3: {
                                ...defaultEntryProps,
                                event: EVENT.DIAPER,
                                diaper: DIAPER.DIRTY,
                                mood: 'Cranky',
                                notes: 'very messy!',
                            },
                        },
                    },
                },
            },
        },
    }),
    dispatch: action('dispatch', {allowFunction: true}),
    subscribe: action('subscribe', {allowFunction: true}),
};

const withWrappers = (component) => () => (
    <Provider store={mockStore}>
        <Container>{component}</Container>
    </Provider>
);

export const BreastFeeding = withWrappers(
    <EditEntryPage logId={logId} id='entry1' />
);

export const BottleFeeding = withWrappers(
    <EditEntryPage logId={logId} id='entry2' />
);

export const Diaper = withWrappers(
    <EditEntryPage logId={logId} id='entry3' />
);

export default {
    title: 'EditEntryPage',
    component: EditEntryPage,
};
