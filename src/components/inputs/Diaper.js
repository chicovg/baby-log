import React from 'react';
import { Form } from 'semantic-ui-react';

import { DIAPER } from '../../utils/constants';

function Diaper({ isDiaper, diaper, handleChange }) {
    if (!isDiaper) {
        return null;
    }

    return (
        <Form.Group inline>
          <label>Diaper</label>
          <Form.Radio
            label='Dirty'
            name='diaper'
            value={ DIAPER.DIRTY }
            checked={ diaper === DIAPER.DIRTY }
            onChange={ handleChange }
          />
          <Form.Radio
            label='Wet'
            name='diaper'
            value={ DIAPER.WET }
            checked={ diaper === DIAPER.WET }
            onChange={ handleChange }
          />
        </Form.Group>
    );
}

export default Diaper;