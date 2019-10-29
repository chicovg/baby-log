import React from 'react';
import { Form, Input } from 'semantic-ui-react';

function Amount({ isBottle, amount, handleChange }) {
    if (!isBottle) {
        return null;
    }

    return (
        <Form.Input
          control={ Input }
          label='Amount'
          onChange={ handleChange }
          name='amount'
          type='text'
          value={ amount }
          width='six'
        />
    );
}

export default Amount;
