import React, {useState} from 'react';
import {Button, Divider, Form} from 'semantic-ui-react';

import Amount from './inputs/Amount';
import Breast from './inputs/Breast';
import Date from './inputs/Date';
import Diaper from './inputs/Diaper';
import Duration from './inputs/Duration';
import Event from './inputs/Event';
import Feeding from './inputs/Feeding';
import Mood from './inputs/Mood';
import Notes from './inputs/Notes';
import Time from './inputs/Time';

import {EVENT, FEEDING} from '../utils/constants';
import {currentTime} from '../utils/dates';
import {toDisplayedEntry, toStoredEntry} from '../utils/entries';
import {goTo, viewEntriesForDate} from '../utils/locations';

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

const handleEntryChange = (entry, setEntry) => (e, {name, value}) => {
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
            [name]: value,
        });
    }
};

const handleEntrySubmit = (logId, entry, saveEntry) => () => {
    return saveEntry(toStoredEntry(entry)).then(() =>
        goTo(viewEntriesForDate.link(logId, entry.date))
    );
};

export default ({logId, date: dateProp, entry: entryProp, saveEntry}) => {
    const [entryState, setEntryState] = useState(
        toDisplayedEntry({
            ...initialState,
            date: dateProp,
            time: currentTime(),
            ...entryProp,
        })
    );

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
        unit,
    } = entryState;
    const eventPopulated = date && time && event;
    const breastFeedingPopulated = feeding && breast && duration;
    const bottleFeedingPopulated = feeding && amount;
    const pumpingPopulated = event === EVENT.PUMPING && amount;
    const submitEnabled =
        eventPopulated &&
        (breastFeedingPopulated || bottleFeedingPopulated || pumpingPopulated || diaper);

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Date date={date} handleChange={handleChange} />
                <Time time={time} handleChange={handleChange} />
            </Form.Group>
            <Event event={event} handleChange={handleChange} />
            <Feeding
                event={event}
                feeding={feeding}
                handleChange={handleChange}
            />
            <Breast
                breast={breast}
                feeding={feeding}
                handleChange={handleChange}
            />
            <Duration
                duration={duration}
                isBreastFeeding={feeding === FEEDING.BREAST}
                handleChange={handleChange}
            />
            <Amount
                amount={amount}
                event={event}
                feeding={feeding}
                handleChange={handleChange}
                unit={unit}
            />
            <Diaper diaper={diaper} event={event} handleChange={handleChange} />
            <Mood mood={mood} handleChange={handleChange} />
            <Notes notes={notes} handleChange={handleChange} />
            <Divider hidden />
            <Button disabled={!submitEnabled} primary type="submit">
                Submit
            </Button>
            <Button type="button" onClick={() => window.history.back()}>
                Cancel
            </Button>
            {/* <pre>{JSON.stringify(entryState, null, 2)}</pre> */}
        </Form>
    );
};
