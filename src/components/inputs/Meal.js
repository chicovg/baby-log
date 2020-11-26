import React from 'react';
import {Form, Input} from 'semantic-ui-react';

import {EVENT} from '../../utils/constants';

export default ({meal, event, handleChange}) => {
    const isMealEvent = event === EVENT.MEAL;

    if (!isMealEvent) {
        return null;
    }

    return (
        <Form.Group>
            <Form.Input
                control={Input}
                label='Meal'
                placeholder='Describe the meal'
                onChange={handleChange}
                name='meal'
                type='text'
                value={meal}
                width='twelve'
            />
        </Form.Group>
    );
};
