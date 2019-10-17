import React from 'react';
import { TimeInput } from 'semantic-ui-calendar-react';

function Time({ time, handleChange }) {
    return (
        <TimeInput
          name='time'
          onChange={ handleChange }
          placeholder='Time'
          value={ time }
          width='six'
        />
    );
}

export default Time;
