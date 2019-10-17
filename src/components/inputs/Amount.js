import React from 'react';
import { Form, Input } from 'semantic-ui-react';

function Amount({ isBottle, amount, handleChange }) {
    if (!isBottle) {
        return null;
    }

    return (
        <Form.Input
          control={ Input }
          label='Amount (oz)'
          onChange={ handleChange }
          name='amount'
          type='number'
          min={0}
          max={64}
          width='six'
        />
    );
}

export default Amount;
