import React from 'react';
import {Container} from 'semantic-ui-react';
import {linkTo} from '@storybook/addon-links';

import {EVENT} from '../utils/constants';
import {LogFilter} from '../components';

const withContainer = (component) => () => <Container>{component}</Container>;

const selectFilter = (eventValue) => {
    console.log(eventValue);
    switch (eventValue) {
        case EVENT.DIAPER:
            return linkTo('LogFilter', 'Select Diapers');
        case EVENT.FEEDING:
            return linkTo('LogFilter', 'Select Feedings');
        case EVENT.PUMPING:
            return linkTo('LogFilter', 'Select Pumpings');
        default:
            return linkTo('LogFilter', 'Default');
    }
};

export const Default = withContainer(
    <LogFilter event={null} selectFilter={selectFilter} />
);

export const SelectDiapers = withContainer(
    <LogFilter event={EVENT.DIAPER} selectFilter={selectFilter} />
);

export const SelectFeedings = withContainer(
    <LogFilter event={EVENT.FEEDING} selectFilter={selectFilter} />
);

export const SelectPumpings = withContainer(
    <LogFilter event={EVENT.PUMPING} selectFilter={selectFilter} />
);

export default {
    title: 'LogFilter',
    component: LogFilter,
};
