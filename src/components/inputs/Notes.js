import React from 'react';
import {Form} from 'semantic-ui-react';

export default ({notes, handleChange}) => (
    <Form.Group>
        <Form.TextArea
            label='Notes'
            name='notes'
            placeholder='Any special notes...'
            type='text'
            onChange={handleChange}
            value={notes}
            width='twelve'
        />
    </Form.Group>
);
