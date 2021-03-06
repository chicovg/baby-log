import React from 'react';
import {Form} from 'semantic-ui-react';

import {EVENT} from '../../utils/constants';

export default ({event, handleChange}) => {
    return (
        <Form.Group grouped>
            <label>Event</label>
            <Form.Radio
                label='Feeding'
                name='event'
                value={EVENT.FEEDING}
                checked={event === EVENT.FEEDING}
                onChange={handleChange}
            />
            <Form.Radio
                label='Meal'
                name='event'
                value={EVENT.MEAL}
                checked={event === EVENT.MEAL}
                onChange={handleChange}
            />
            <Form.Radio
                label='Diaper'
                name='event'
                value={EVENT.DIAPER}
                checked={event === EVENT.DIAPER}
                onChange={handleChange}
            />
            <Form.Radio
                label='Pumping'
                name='event'
                value={EVENT.PUMPING}
                checked={event === EVENT.PUMPING}
                onChange={handleChange}
            />
            <Form.Radio
                label='Other'
                name='event'
                value={EVENT.OTHER}
                checked={event === EVENT.OTHER}
                onChange={handleChange}
            />
        </Form.Group>
    );
};
