import React from 'react';
import {Button, Divider, Form} from 'semantic-ui-react';

import {OZ, CUP, QUART, ML} from '../utils/units';

const unitOptions = [
    {
        key: ML,
        text: 'Milliliter (mL)',
        value: ML,
    },
    {
        key: OZ,
        text: 'US fluid ounce (fl. oz.)',
        value: OZ,
    },
    {
        key: CUP,
        text: 'US liquid cup (cup)',
        value: CUP,
    },
    {
        key: QUART,
        text: 'US liquid quart (qt.)',
        value: QUART,
    },
];

const LogForm = ({log: {title, babyName, unit}, handleChange, handleSubmit}) => {
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Input
                    name='title'
                    label='Log Title'
                    onChange={handleChange}
                    type='text'
                    value={title}
                    width='six'
                />
                <Form.Input
                    name='babyName'
                    label="Baby's name"
                    onChange={handleChange}
                    type='text'
                    value={babyName}
                    width='six'
                />
            </Form.Group>
            <Form.Group>
                <Form.Dropdown
                    name='unit'
                    label='Default Unit'
                    onChange={handleChange}
                    options={unitOptions}
                    value={unit}
                    width='six'
                />
            </Form.Group>
            <Divider hidden />
            <Button disabled={!(babyName || title || unit)} primary type='submit'>
                Submit
            </Button>
            <Button type='button' onClick={() => window.history.back()}>
                Cancel
            </Button>
        </Form>
    );
};

export default LogForm;
