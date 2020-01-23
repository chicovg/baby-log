import React, {useEffect, useState} from 'react';
import {Button, Form} from 'semantic-ui-react';
import useUnits from '../hooks/use-units';

const initialState = {
    title: '',
    babyName: '',
};

const handleLogChange = (log, setLog) => (e, {name, value}) => {
    setLog({
        ...log,
        [name]: value,
    });
};

const handleLogSubmit = (log, saveLog) => () => saveLog(log);

const LogForm = ({log, saveLog}) => {
    const [logState, setLogState] = useState(initialState);
    const {unitOptions} = useUnits();

    useEffect(
        () =>
            setLogState({
                ...log,
            }),
        [log]
    );

    const {babyName, title, totalPumped, unit} = logState;

    const handleChange = handleLogChange(logState, setLogState);

    return (
        <Form onSubmit={handleLogSubmit(logState, saveLog)}>
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
                <Form.Input
                    name='totalPumped'
                    label='Amount Pumped'
                    onChange={handleChange}
                    type='number'
                    value={totalPumped}
                    width='six'
                />
                <Form.Dropdown
                    defaultValue='fl. oz.'
                    name='defaultUnit'
                    label='Default Unit'
                    onChange={handleChange}
                    options={unitOptions}
                    width='six'
                />
            </Form.Group>
            <Button primary type='submit'>
                Submit
            </Button>
            <Button type='button' onClick={() => window.history.back()}>
                Cancel
            </Button>
        </Form>
    );
};

export default LogForm;
