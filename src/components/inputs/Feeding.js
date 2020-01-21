import React from 'react';
import {Form} from 'semantic-ui-react';

import {FEEDING} from '../../utils/constants';

export default ({feeding, isFeeding, handleChange}) => {
    if (!isFeeding) {
        return null;
    }

    return (
        <Form.Group grouped>
            <label>Breast or Bottle?</label>
            <Form.Radio
                label="Breast"
                name="feeding"
                value={FEEDING.BREAST}
                checked={feeding === FEEDING.BREAST}
                onChange={handleChange}
            />
            <Form.Radio
                label="Bottle"
                name="feeding"
                value={FEEDING.BOTTLE}
                checked={feeding === FEEDING.BOTTLE}
                onChange={handleChange}
            />
            <Form.Radio
                label="Expression"
                name="feeding"
                value={FEEDING.EXPRESSION}
                checked={feeding === FEEDING.EXPRESSION}
                onChange={handleChange}
            />
            <Form.Radio
                label="Pumping"
                name="feeding"
                value={FEEDING.PUMP}
                checked={feeding === FEEDING.PUMP}
                onChange={handleChange}
            />
        </Form.Group>
    );
};
