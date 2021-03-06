import React from 'react';
import {action} from '@storybook/addon-actions';
import 'semantic-ui-css/semantic.css';
import {Container} from 'semantic-ui-react';

import LogForm from '../components/LogForm';

const withContainer = (component) => () => <Container>{component}</Container>

const createLogProps = {
    log: {
        title: '',
        babyName: '',
        unit: 'fl. oz.',
    },
    saveLog: action('save log'),
};

export const CreateLog = withContainer(<LogForm {...createLogProps}/>);

const editLogProps = {
    log: {
        title: 'A log',
        babyName: 'A baby',
        unit: 'fl. oz.',
    },
    saveLog: action('save log'),
}

export const EditLog = withContainer(<LogForm {...editLogProps}/>);

export default {
    title: 'LogForm',
    component: LogForm,
};
