import React from 'react';
import {Dropdown, Form, Input} from 'semantic-ui-react';

import {EVENT, FEEDING} from '../../utils/constants';

const units = [
    {
        key: 1,
        text: 'fl. oz.',
        value: 'fl. oz.',
    },
    {
        key: 2,
        text: 'cup',
        value: 'cup',
    },
    {
        key: 3,
        text: 'quart',
        value: 'quart',
    },
    {
        key: 4,
        text: 'mL',
        value: 'mL',
    },
];

const shouldHide = ({event, feeding}) => {
    if (event === EVENT.PUMPING) {
        return false;
    }

    if (feeding === FEEDING.BOTTLE || feeding === FEEDING.EXPRESSION) {
        return false;
    }

    return true;
}

export default ({amount, unit, event, feeding, handleChange}) => {
    if (shouldHide({event, feeding})) {
        return null;
    }

    const unitsDropdown = <Dropdown
                            defaultValue='fl. oz.'
                            name='unit'
                            onChange={handleChange}
                            options={units}
                          />;

    return (
        <Form.Group>
            <Form.Field width='twelve'>
                <label>Amount</label>
                <Input
                    label={unitsDropdown}
                    labelPosition='right'
                    placeholder='ex. 4'
                    onChange={handleChange}
                    name='amount'
                    type='number'
                    value={amount}
                />
            </Form.Field>
        </Form.Group>
    );
};
