import React, {useEffect, useState} from 'react';
import {Button, Form} from 'semantic-ui-react';

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

    useEffect(
        () =>
            setLogState({
                ...log,
            }),
        [log]
    );

    const {babyName, title} = logState;

    const handleChange = handleLogChange(logState, setLogState);

    return (
        <Form onSubmit={handleLogSubmit(logState, saveLog)}>
            <Form.Group>
                <Form.Input
                    name="title"
                    label="Log Title"
                    onChange={handleChange}
                    type="text"
                    value={title}
                    width="six"
                />
                <Form.Input
                    name="babyName"
                    label="Baby's name"
                    onChange={handleChange}
                    type="text"
                    value={babyName}
                    width="six"
                />
            </Form.Group>
            <Button primary type="submit">
                Submit
            </Button>
            <Button type="button" onClick={() => window.history.back()}>
                Cancel
            </Button>
        </Form>
    );
};

export default LogForm;
