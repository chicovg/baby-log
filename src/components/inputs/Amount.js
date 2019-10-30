import React from 'react';
import { Form, Input } from 'semantic-ui-react';

import { FEEDING } from '../../utils/constants';

function Amount({ amount, feeding, handleChange }) {
    if (feeding !== FEEDING.BOTTLE && feeding !== FEEDING.EXPRESSION) {
        return null;
    }

    return (
        <Form.Group>
          <Form.Input
            control={ Input }
            label='Amount'
            placeholder='ex. 4 oz'
            onChange={ handleChange }
            name='amount'
            type='text'
            value={ amount }
            width='six'
          />
        </Form.Group>
    );
}

export default Amount;
