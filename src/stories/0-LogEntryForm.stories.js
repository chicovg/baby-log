import React from 'react';
import {action} from '@storybook/addon-actions';
import 'semantic-ui-css/semantic.css';
import {Container} from 'semantic-ui-react';

import LogEntryForm from '../components/LogEntryForm';
import {BREAST, EVENT, FEEDING} from '../utils/constants';
import {currentDateKey} from '../utils/dates';

export default {
    title: 'LogEntryForm',
    component: LogEntryForm,
};

const withContainer = (component) => () => <Container>{component}</Container>

const addEntryProps = {
    date: currentDateKey(),
    saveEntry: action(`save entry`),
};

export const AddEntry = withContainer(<LogEntryForm {...addEntryProps}/>);

const bfEntryProps = {
    ...addEntryProps,
    entry: {
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
        event: EVENT.PUMPING,
    },
};

export const EditPumping = withContainer(<LogEntryForm {...pumpingEntryProps} />);

const diaperEntryProps = {
    ...addEntryProps,
    entry: {
        event: EVENT.DIAPER,
    }
}

export const EditDiaper = withContainer(<LogEntryForm {...diaperEntryProps} />);
