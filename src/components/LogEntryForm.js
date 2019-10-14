import React, { useEffect, useState } from 'react';
import { Button, Form } from 'semantic-ui-react';

import Amount from './inputs/Amount';
import Breast from './inputs/Breast';
import BreastOrBottle from './inputs/BreastOrBottle';
import Date from './inputs/Date';
import Diaper from './inputs/Diaper';
import Duration from './inputs/Duration';
import FeedingOrDiaper from './inputs/FeedingOrDiaper';
import Mood from './inputs/Mood';
import Time from './inputs/Time';

import { EVENT, FEEDING } from '../utils/constants';

const initialState = {
    date: '',
    time: '',
    mood: '',
    event: '',
    feeding: '',
    breast: '',
    duration: '',
    amount: '',
    diaper: '',
    userId: '',
};

const handleEntryChange = (entry, setEntry) => (e, { name, value }) => {
    if (name === 'event') {
        setEntry({
            ...entry,
            event: value,
            feeding: '',
            breast: '',
            duration: '',
            amount: '',
            diaper: '',
        });
    } else if (name === 'feeding') {
        setEntry({
            ...entry,
            feeding: value,
            breast: '',
            duration: '',
            amount: '',
        });
    } else {
        setEntry({
            ...entry,
            [name]: value
        });
    }
};

const handleEntrySubmit = (entry, saveEntry) => () => {
    return saveEntry(entry)
        .then(() => window.location.hash = `/entries/${entry.date}`);
};

function LogEntryForm(props) {
    const [entryState, setEntryState] = useState(initialState);
    const {
        date: dateProp,
        entry: entryProp,
        saveEntry,
    } = props;

    useEffect(() => {
        setEntryState({
            ...entryState,
            ...entryProp,
            date: dateProp,
        });
    }, [dateProp, entryProp, entryState]);

    const handleChange = handleEntryChange(entryState, setEntryState);
    const handleSubmit = handleEntrySubmit(entryState, saveEntry);

    const {
        date,
        time,
        event,
        feeding,
        breast,
        duration,
        amount,
        diaper,
        mood,
    } = entryState;
    const eventPopulated = date && time && event;
    const breastFeedingPopulated = feeding && breast && duration;
    const bottleFeedingPopulated = feeding && amount;
    const submitEnabled = eventPopulated && (breastFeedingPopulated || bottleFeedingPopulated || diaper);

    return (
        <Form onSubmit={ handleSubmit }>
          <Form.Group>
            <Date
              date={ date }
              handleChange={ handleChange }
            />
            <Time
              time={ time }
              handleChange={ handleChange }
            />
          </Form.Group>
          <Form.Group>
            <Mood
              mood={ mood }
              handleChange={ handleChange }/>
          </Form.Group>
          <FeedingOrDiaper
            event={ event }
            handleChange={ handleChange }
          />
          <BreastOrBottle
            feeding={ feeding }
            isFeeding={ event === EVENT.FEEDING }
            handleChange={ handleChange }
          />
          <Breast
            breast={ breast }
            isBreastFeeding={ feeding === FEEDING.BREAST }
            handleChange={ handleChange }
          />
          <Duration
            duration={ duration }
            isBreastFeeding={ feeding === FEEDING.BREAST }
            handleChange={ handleChange }
          />
          <Amount
            amount={ amount }
            isBottle={ feeding === FEEDING.BOTTLE }
            handleChange={ handleChange }
          />
          <Diaper
            diaper={ diaper }
            isDiaper={ event === EVENT.DIAPER }
            handleChange={ handleChange }
          />
          <Button
            disabled={ !submitEnabled }
            type='submit'
          >
            Submit
          </Button>
          {/* <pre>{ JSON.stringify(entryState, null, 2) }</pre> */}
        </Form>
    );
}

export default LogEntryForm;
