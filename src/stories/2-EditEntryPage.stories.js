import React from 'react';
import 'semantic-ui-css/semantic.css';

import {withWrappers} from './common';
import {logId, userId, mockStore} from './fixtures';
import {BREAST, DIAPER, EVENT, FEEDING} from '../utils/constants';
import EditEntryPage from '../components/EditEntryPage';

const defaultEntryProps = {
    userId,
    logId,
    date: '2020-01-01',
};

const entries = {
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
};

export const BreastFeeding = withWrappers(mockStore({entries}))(
    <EditEntryPage logId={logId} id='entry1' />
);

export const BottleFeeding = withWrappers(mockStore({entries}))(
    <EditEntryPage logId={logId} id='entry2' />
);

export const Diaper = withWrappers(mockStore({entries}))(
    <EditEntryPage logId={logId} id='entry3' />
);

export default {
    title: 'EditEntryPage',
    component: EditEntryPage,
};
