import React from 'react';
import 'semantic-ui-css/semantic.css';

import {withWrappers} from './common';
import {logId, mockStore} from './fixtures';
import {DeleteEntryPage} from '../components';

const date = '2020-01-01';

export const Default = withWrappers(mockStore({}))(
    <DeleteEntryPage date={date} id='entry1' logId={logId} />
);

export default {
    title: 'DeleteEntryPage',
    component: DeleteEntryPage,
};
