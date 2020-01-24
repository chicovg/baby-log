import React from 'react';
import {action} from '@storybook/addon-actions';
import 'semantic-ui-css/semantic.css';
import {Container} from 'semantic-ui-react';

import LogEntryForm from '../components/LogEntryForm';
import {BREAST, EVENT, FEEDING} from '../utils/constants';

const withContainer = (component) => () => <Container>{component}</Container>

const addEntryProps = {
    handleChange: action(`handleChange`),
    handleSubmit: action(`handleSubmit`),
    entry: {
        date: '2020-01-01',
    },
};

export const AddEntry = withContainer(<LogEntryForm {...addEntryProps}/>);

const bfEntryProps = {
    ...addEntryProps,
    entry: {
        date: '2020-01-01',
        time: '13:15',
        event: EVENT.FEEDING,
        feeding: FEEDING.BREAST,
        breast: BREAST.RIGHT,
        duration: '20',
    },
};

export const EditBreastFeeding = withContainer(<LogEntryForm {...bfEntryProps} />);

const bottleEntryProps = {
    ...addEntryProps,
    entry: {
        date: '2020-01-01',
        time: '1:23',
        event: EVENT.FEEDING,
        feeding: FEEDING.BOTTLE,
        amount: 4,
        unit: 'fl. oz.'
    },
};

export const EditBottleFeeding = withContainer(<LogEntryForm {...bottleEntryProps} />);

const pumpingEntryProps = {
    ...addEntryProps,
    entry: {
        date: '2020-01-02',
        time: '5:30',
        event: EVENT.PUMPING,
    },
};

export const EditPumping = withContainer(<LogEntryForm {...pumpingEntryProps} />);

const diaperEntryProps = {
    ...addEntryProps,
    entry: {
        date: '2020-01-02',
        time: '15:30',
        event: EVENT.DIAPER,
    }
}

export const EditDiaper = withContainer(<LogEntryForm {...diaperEntryProps} />);

export default {
    title: 'LogEntryForm',
    component: LogEntryForm,
};
