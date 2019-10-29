import React from 'react';
import { Form, Input } from 'semantic-ui-react';

import { FEEDING } from '../../utils/constants';

function Amount({ amount, feeding, handleChange }) {
    if (feeding != FEEDING.BOTTLE && feeding != FEEDING.EXPRESSION) {
        return null;
    }

    return (
        <Form.Input
          control={ Input }
          label='Amount (including unit)'
          onChange={ handleChange }
          name='amount'
          type='text'
          value={ amount }
          width='six'
        />
    );
}

export default Amount;
