import React from 'react';
import {Form} from 'semantic-ui-react';

import {BREAST, FEEDING} from '../../utils/constants';

export default ({breast, duration, feeding, handleChange}) => {
    if (feeding !== FEEDING.BREAST) {
        return null;
    }

    return (
        <Form.Group grouped>
            <label>Left, Right, or Both?</label>
            <Form.Radio
                label='Left'
                name='breast'
                value={BREAST.LEFT}
                checked={breast === BREAST.LEFT}
                onChange={handleChange}
            />
            <Form.Radio
                label='Right'
                name='breast'
                value={BREAST.RIGHT}
                checked={breast === BREAST.RIGHT}
                onChange={handleChange}
            />
            <Form.Radio
                label='Both'
                name='breast'
                value={BREAST.BOTH}
                checked={breast === BREAST.BOTH}
                onChange={handleChange}
            />
        </Form.Group>
    );
};
