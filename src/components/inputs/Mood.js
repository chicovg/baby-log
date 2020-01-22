import React from 'react';
import {Form, Input} from 'semantic-ui-react';

export default ({mood, handleChange}) => (
    <Form.Group>
        <Form.Input
            control={Input}
            label="Baby's Mood"
            placeholder='Happy, Cranky, etc.'
            name='mood'
            type='text'
            onChange={handleChange}
            value={mood}
            width='twelve'
        />
    </Form.Group>
);
