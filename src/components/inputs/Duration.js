import React from 'react';
import { Form, Input } from 'semantic-ui-react';

function Duration({ isBreastFeeding, duration, handleChange }) {
    if (!isBreastFeeding) {
        return null;
    }

    return (
        <Form.Group>
          <Form.Input
            control={Input}
            label='Duration'
            placeholder='Duration in minutes'
            onChange={ handleChange }
            name='duration'
            min={0}
            max={60}
            step={1}
            type='number'
            value={ duration }
            width='six'
          />
        </Form.Group>
    );
}

export default Duration;
