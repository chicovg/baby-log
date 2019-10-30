import React from 'react';
import { TimeInput } from 'semantic-ui-calendar-react';

function Time({ time, handleChange }) {
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
}

export default Time;
