import React from 'react';
import {Form} from 'semantic-ui-react';

import {EVENT, MEAL_TYPE} from '../../utils/constants';

export default ({event, mealType, handleChange}) => {
    const isMealEvent = event === EVENT.MEAL;

    if (!isMealEvent) {
        return null;
    }

    return (
        <Form.Group grouped>
            <label>Which Meal?</label>
            <Form.Radio
                label='Breakfast'
                name='mealType'
                value={MEAL_TYPE.BREAKFAST}
                checked={mealType === MEAL_TYPE.BREAKFAST}
                onChange={handleChange}
            />
            <Form.Radio
                label='Lunch'
                name='mealType'
                value={MEAL_TYPE.LUNCH}
                checked={mealType === MEAL_TYPE.LUNCH}
                onChange={handleChange}
            />
            <Form.Radio
                label='Dinner'
                name='mealType'
                value={MEAL_TYPE.DINNER}
                checked={mealType === MEAL_TYPE.DINNER}
                onChange={handleChange}
            />
            <Form.Radio
                label='Snack'
                name='mealType'
                value={MEAL_TYPE.SNACK}
                checked={mealType === MEAL_TYPE.SNACK}
                onChange={handleChange}
            />
        </Form.Group>
    );
};
