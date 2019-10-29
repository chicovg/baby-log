import React from 'react';
import { Form, Input } from 'semantic-ui-react';

function Notes({ notes, handleChange }) {
    return(
        <Form.TextArea
          label="Notes"
          name='notes'
          placeholder='Any special notes...'
          type='text'
          onChange={ handleChange }
          value={ notes }
          width='twelve'
        />
    );
}

export default Notes;
