import React from 'react';

import LogPage from './LogPage';
import { currentDateKey } from '../utils/dates';

function CurrentLogPage() {
    return (
        <LogPage date={ currentDateKey() } />
    );
}

export default CurrentLogPage;
