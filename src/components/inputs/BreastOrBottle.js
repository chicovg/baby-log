import React from 'react';
import { Form } from 'semantic-ui-react';

import { FEEDING } from '../../utils/constants';

function BreastOrBottle({ feeding, isFeeding, handleChange }) {
    if (!isFeeding) {
        return null;
    }

    return (
        <Form.Group inline>
          <label>Breast or Bottle?</label>
          <Form.Radio
            label='Breast'
            name='feeding'
            value={FEEDING.BREAST}
            checked={feeding === FEEDING.BREAST}
            onChange={handleChange}
          />
          <Form.Radio
            label='Bottle'
            name='feeding'
            value={FEEDING.BOTTLE}
            checked={feeding === FEEDING.BOTTLE}
            onChange={handleChange}
          />
        </Form.Group>
    );
}

export default BreastOrBottle;
