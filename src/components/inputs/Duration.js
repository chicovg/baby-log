import React from 'react';
import {Form, Input} from 'semantic-ui-react';

import {FEEDING, EVENT} from '../../utils/constants';

export default ({duration, event, feeding, handleChange}) => {
    const isOtherEvent = event === EVENT.OTHER;
    const isBreastFeeding = feeding === FEEDING.BREAST;

    if (!(isOtherEvent || isBreastFeeding)) {
        return null;
    }

    return (
        <Form.Group>
            <Form.Input
                control={Input}
                label='Duration'
                placeholder='Duration in minutes'
                onChange={handleChange}
                name='duration'
                min={0}
                max={60}
                step={1}
                type='number'
                value={duration}
                width='twelve'
            />
        </Form.Group>
    );
};
