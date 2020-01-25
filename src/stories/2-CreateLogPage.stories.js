import React from 'react';
import {Provider} from 'react-redux';
import 'semantic-ui-css/semantic.css';
import {Container} from 'semantic-ui-react';

import {mockStore} from './fixtures';
import CreateLogPage from '../components/CreateLogPage';

const withWrappers = (store) => (component) => () => (
      <Provider store={store}>
        <Container>{component}</Container>
      </Provider>
);

export const Default = withWrappers(mockStore({}))(<CreateLogPage />);

export default {
    title: 'CreateLogPage',
    component: CreateLogPage,
}
