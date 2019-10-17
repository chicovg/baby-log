import React from 'react';
import { DateInput } from 'semantic-ui-calendar-react';

import { DATE_KEY_FORMAT } from '../../utils/dates';

function Date({ date, handleChange }) {
    return (
        <DateInput
        dateFormat={ DATE_KEY_FORMAT }
        name='date'
        onChange={ handleChange }
        placeholder='Date'
        value={ date }
        width='six'
            />
    );
}

export default Date;
