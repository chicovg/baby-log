import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';

import Amount from './inputs/Amount';
import Breast from './inputs/Breast';
import BreastOrBottle from './inputs/BreastOrBottle';
import Date from './inputs/Date';
import Diaper from './inputs/Diaper';
import Duration from './inputs/Duration';
import FeedingOrDiaper from './inputs/FeedingOrDiaper';
import Mood from './inputs/Mood';
import Notes from './inputs/Notes';
import Time from './inputs/Time';

import { EVENT, FEEDING } from '../utils/constants';
import { currentTime, toTimeKey } from '../utils/dates';
import { goTo, viewEntriesForDate } from '../utils/locations';

const initialState = {
    date: '',
    time: '',
    event: '',
    feeding: '',
    breast: '',
    duration: '',
    amount: '',
    diaper: '',
    mood: '',
    notes: '',
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

const handleEntrySubmit = (logId, entry, saveEntry) => () => {
    return saveEntry({
        ...entry,
        time: toTimeKey(entry.date)(entry.time)
    })
        .then(() => goTo(viewEntriesForDate.link(logId, entry.date)));
};

function LogEntryForm({
    logId,
    date: dateProp,
    entry: entryProp,
    saveEntry,
}) {
    const [entryState, setEntryState] = useState({
        ...initialState,
        date: dateProp,
        time: currentTime(),
        ...entryProp,
    });

    const handleChange = handleEntryChange(entryState, setEntryState);
    const handleSubmit = handleEntrySubmit(logId, entryState, saveEntry);

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
        notes,
    } = entryState;
    const eventPopulated = date && time && event;
    const breastFeedingPopulated = feeding && breast && duration;
    const bottleFeedingPopulated = feeding && amount;
    const submitEnabled = eventPopulated
          && (breastFeedingPopulated || bottleFeedingPopulated || diaper);

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
          <Form.Group>
            <Mood
              mood={ mood }
              handleChange={ handleChange }
            />
          </Form.Group>
          <Form.Group>
            <Notes
              notes={ notes }
              handleChange={ handleChange }
            />
          </Form.Group>
          <Button
            disabled={ !submitEnabled }
            primary
            type='submit'
          >
            Submit
          </Button>
          <Button
            type='button'
            onClick={ () => window.history.back() }
          >
            Cancel
          </Button>
          {/* <pre>{JSON.stringify(entryState, null, 2)}</pre> */}
        </Form>
    );
}

export default LogEntryForm;
