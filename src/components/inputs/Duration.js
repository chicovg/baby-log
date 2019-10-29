import React from 'react';
import { Form, Input } from 'semantic-ui-react';

function Duration({ isBreastFeeding, duration, handleChange }) {
    if (!isBreastFeeding) {
        return null;
    }

    return (
        <Form.Input
          control={Input}
          label='Duration (Minutes)'
          onChange={ handleChange }
          name='duration'
          min={0}
          max={60}
          step={1}
          type='number'
          value={ duration }
          width='six'
        />
    );
}

export default Duration;
