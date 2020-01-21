import React from 'react';
import {DateInput} from 'semantic-ui-calendar-react';

import {DATE_KEY_FORMAT} from '../../utils/dates';

export default ({date, handleChange}) => (
    <DateInput
        dateFormat={DATE_KEY_FORMAT}
        name='date'
        onChange={handleChange}
        label='Date'
        placeholder='Date'
        value={date}
        width='six'
    />
);
