import {useState} from 'react';

export default ({initialState, saveLog}) => {
    const [log, setLog] = useState(initialState);

    const handleChange = (e ,{name, value}) => setLog({
        ...log,
        [name]: value,
    });

    const handleSubmit = () => {
        console.log(log);
        saveLog(log)
    };

    return {
        log,
        handleChange,
        handleSubmit,
    };
}
