import React from 'react';
import {Provider} from 'react-redux';
import {action} from '@storybook/addon-actions';
import 'semantic-ui-css/semantic.css';
import {Container} from 'semantic-ui-react';

import {BREAST, DIAPER, EVENT, FEEDING} from '../utils/constants';
import {CreateEntryPage} from '../components';

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
    }),
    dispatch: action('dispatch', {allowFunction: true}),
    subscribe: action('subscribe', {allowFunction: true}),
};

const withWrappers = (component) => () => (
    <Provider store={mockStore}>
        <Container>{component}</Container>
    </Provider>
);

export const Default = withWrappers(
    <CreateEntryPage logId={logId} date='2020-01-01' />
);

export default {
    title: 'CreateEntryPage',
    component: CreateEntryPage,
};
