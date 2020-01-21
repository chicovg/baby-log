import React from 'react';
import {Form} from 'semantic-ui-react';

function Notes({notes, handleChange}) {
    return (
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
}

export default Notes;
