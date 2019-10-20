import React from 'react';
import { Form } from 'semantic-ui-react';

import { EVENT } from '../../utils/constants';

function FeedingOrDiaper({ event, handleChange }) {
    return (
        <Form.Group inline>
          <label>Feeding or Diaper?</label>
          <Form.Radio
            label='Feeding'
            name='event'
            value={EVENT.FEEDING}
            checked={event === EVENT.FEEDING}
            onChange={handleChange}
          />
          <Form.Radio
            label='Diaper'
            name='event'
            value={EVENT.DIAPER}
            checked={event === EVENT.DIAPER}
            onChange={handleChange}
          />
        </Form.Group>
    );
}

export default FeedingOrDiaper;