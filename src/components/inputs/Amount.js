import React from 'react';
import {Dropdown, Form, Input} from 'semantic-ui-react';

import {EVENT, FEEDING} from '../../utils/constants';
import useUnits from '../../hooks/use-units';

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
    const {unitOptions} = useUnits();

    if (shouldHide({event, feeding})) {
        return null;
    }

    const unitsDropdown = <Dropdown
                            defaultValue='fl. oz.'
                            name='unit'
                            onChange={handleChange}
                            options={unitOptions}
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
