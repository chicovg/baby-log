import React from 'react';
import {Form, Input} from 'semantic-ui-react';

import {FEEDING, EVENT} from '../../utils/constants';

export default ({durationHours, durationMinutes, event, feeding, handleChange}) => {
    const isOtherEvent = event === EVENT.OTHER;
    const isBreastFeeding = feeding === FEEDING.BREAST;

    if (!(isOtherEvent || isBreastFeeding)) {
        return null;
    }

    return (
        <Form.Group>
            <Form.Input
                control={Input}
                label='Duration (hours)'
                placeholder='Duration in hours'
                onChange={handleChange}
                name='durationHours'
                min={0}
                max={24}
                step={1}
                type='number'
                value={durationHours}
                width='six'
            />
            <Form.Input
                control={Input}
                label='Duration (minutes)'
                placeholder='Duration in minutes'
                onChange={handleChange}
                name='durationMinutes'
                min={0}
                max={60}
                step={1}
                type='number'
                value={durationMinutes}
                width='six'
            />
        </Form.Group>
    );
};
