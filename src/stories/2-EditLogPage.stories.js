import React from 'react';
import {Provider} from 'react-redux';
import {action} from '@storybook/addon-actions';
import 'semantic-ui-css/semantic.css';
import {Container} from 'semantic-ui-react';

import EditLogPage from '../components/EditLogPage';

const mockStore = {
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
                        logs: {
                            log123: {
                                title: 'Test Log',
                                babyName: 'Chuckles',
                                totalPumped: 24,
                                defaultUnit: 'fl. oz.',
                            }
                        }
                    }
                }
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

export const Default = withWrappers(mockStore)(<EditLogPage logId='log123'/>);

export default {
    title: 'EditLogPage',
    component: EditLogPage,
}
