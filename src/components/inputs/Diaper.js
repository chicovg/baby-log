import React from 'react';
import {Form} from 'semantic-ui-react';

import {DIAPER, EVENT} from '../../utils/constants';

export default ({diaper, event, handleChange}) => {
    if (event !== EVENT.DIAPER) {
        return null;
    }

    return (
        <Form.Group grouped>
            <label>Diaper</label>
            <Form.Radio
                label='Dirty'
                name='diaper'
                value={DIAPER.DIRTY}
                checked={diaper === DIAPER.DIRTY}
                onChange={handleChange}
            />
            <Form.Radio
                label='Wet'
                name='diaper'
                value={DIAPER.WET}
                checked={diaper === DIAPER.WET}
                onChange={handleChange}
            />
            <Form.Radio
                label='Both'
                name='diaper'
                value={DIAPER.BOTH}
                checked={diaper === DIAPER.BOTH}
                onChange={handleChange}
            />
        </Form.Group>
    );
};
