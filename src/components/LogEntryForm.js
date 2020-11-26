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
import Meal from './inputs/Meal';
import MealType from './inputs/MealType';
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
        durationHours,
        durationMinutes,
        amount,
        diaper,
        meal,
        mealType,
        mood,
        notes,
        unit,
    } = entry;

    const eventPopulated = date && time && event;
    const breastFeedingPopulated = feeding && breast;
    const bottleFeedingPopulated = feeding && amount;
    const mealPopulated = meal && mealType;
    const pumpingPopulated = event === EVENT.PUMPING && amount && unit;
    const otherPopulated = event === EVENT.OTHER && description;
    const submitEnabled =
        eventPopulated &&
        some(Boolean, [
            breastFeedingPopulated,
            bottleFeedingPopulated,
            diaper,
            mealPopulated,
            otherPopulated,
            pumpingPopulated,
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
            <MealType mealType={mealType} event={event} handleChange={handleChange} />
            <Meal meal={meal} event={event} handleChange={handleChange} />
            <Duration
                durationHours={durationHours}
                durationMinutes={durationMinutes}
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
