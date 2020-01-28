import React from 'react';
import 'semantic-ui-css/semantic.css';

import {withWrappers} from './common';
import {logId} from './fixtures';
import {DeleteLogPage} from '../components';

export const Default = withWrappers()(
    <DeleteLogPage logId={logId} />
);

export default {
    title: 'DeleteLogPage',
    component: DeleteLogPage,
};
