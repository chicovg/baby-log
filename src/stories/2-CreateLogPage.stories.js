import React from 'react';
import {Provider} from 'react-redux';
import {action} from '@storybook/addon-actions';
import 'semantic-ui-css/semantic.css';
import {Container} from 'semantic-ui-react';

import CreateLogPage from '../components/CreateLogPage';

const mockStore = {
    getState: () => ({
        firebase: {
            auth: {
                uid: 'abc1234',
            }
        }
    }),
    dispatch: action('dispatch', {allowFunction: true}),
    subscribe: action('subscribe', {allowFunction: true}),
};

const withWrappers = (store) => (component) => () => (
      <Provider store={store}>
        <Container>{component}</Container>
      </Provider>
);

export const Default = withWrappers(mockStore)(<CreateLogPage />);

export default {
    title: 'CreateLogPage',
    component: CreateLogPage,
}
