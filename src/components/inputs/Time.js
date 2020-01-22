import React from 'react';
import { TimeInput } from 'semantic-ui-calendar-react';

export default ({ time, handleChange }) => {
    return (
        <TimeInput
          name='time'
          onChange={ handleChange }
          label='Time'
          placeholder='Time'
          timeFormat='AMPM'
          value={ time }
          width='six'
        />
    );
};
