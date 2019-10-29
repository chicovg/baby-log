import React from 'react';
import { Form, Input } from 'semantic-ui-react';

function Mood({ mood, handleChange }) {
    return(
        <Form.Input
          control={ Input }
          label="Baby's Mood"
          placeholder='Happy, Cranky, etc.'
          name='mood'
          type='text'
          onChange={ handleChange }
          value={ mood }
          width='six'
        />
    );
}

export default Mood;
