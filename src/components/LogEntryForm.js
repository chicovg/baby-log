import React from 'react';
import {Button, Divider, Form} from 'semantic-ui-react';
import some from 'lodash/fp/some';

import Amount from './inputs/Amount';
import Breast from './inputs/Breast';
import Date from './inputs/Date';
import Diaper from './inputs/Diaper';
import Description from './inputs/Description';
import Duration from './inputs/Duration';
import Event from './inputs/Event';
import Feeding from './inputs/Feeding';
import Mood from './inputs/Mood';
import Notes from './inputs/Notes';
import Time from './inputs/Time';
import {EVENT} from '../utils/constants';

export default ({entry, handleChange, handleSubmit}) => {
    const {
        date,
        time,
        event,
        feeding,
        breast,
        description,
        duration,
        amount,
        diaper,
        mood,
        notes,
        unit,
    } = entry;

    const eventPopulated = date && time && event;
    const breastFeedingPopulated = feeding && breast && duration;
    const bottleFeedingPopulated = feeding && amount;
    const pumpingPopulated = event === EVENT.PUMPING && amount && unit;
    const otherPopulated = event === EVENT.OTHER && description;
    const submitEnabled =
        eventPopulated &&
        some(Boolean, [
            breastFeedingPopulated,
            bottleFeedingPopulated,
            diaper,
            pumpingPopulated,
            otherPopulated,
        ]);

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Date date={date} handleChange={handleChange} />
                <Time time={time} handleChange={handleChange} />
            </Form.Group>
            <Event event={event} handleChange={handleChange} />
            <Feeding event={event} feeding={feeding} handleChange={handleChange} />
            <Breast breast={breast} feeding={feeding} handleChange={handleChange} />
            <Description description={description} event={event} handleChange={handleChange} />
            <Duration
                duration={duration}
                event={event}
                feeding={feeding}
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
            <Button disabled={!submitEnabled} primary type='submit'>
                Submit
            </Button>
            <Button type='button' onClick={() => window.history.back()}>
                Cancel
            </Button>
            {/* <pre>{JSON.stringify(entryState, null, 2)}</pre> */}
        </Form>
    );
};
