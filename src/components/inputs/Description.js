import React from 'react';
import {Form, Input} from 'semantic-ui-react';

import {EVENT} from '../../utils/constants';

export default ({description, event, handleChange}) => {
    const isOtherEvent = event === EVENT.OTHER;

    if (!isOtherEvent) {
        return null;
    }

    return (
        <Form.Group>
            <Form.Input
                control={Input}
                label='Description'
                placeholder='Describe the event'
                onChange={handleChange}
                name='description'
                type='text'
                value={description}
                width='twelve'
            />
        </Form.Group>
    );
};
