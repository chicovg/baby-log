import React from 'react';
import { Form, Input } from 'semantic-ui-react';

import {FEEDING} from '../../utils/constants';

export default ({ duration, feeding, handleChange }) => {
    if (feeding !== FEEDING.BREAST) {
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
