import compose from 'lodash/fp/compose';
import get from 'lodash/fp/get';
import toNumber from 'lodash/fp/toNumber';

import {EVENT, FEEDING, BREAST, DIAPER, MEAL_TYPE} from '../utils/constants';

const getEventDisplayValue = (constant) =>
    ({
        [EVENT.DIAPER]: 'Diaper',
        [EVENT.FEEDING]: 'Feeding',
        [EVENT.PUMPING]: 'Pumping',
        [EVENT.OTHER]: 'Other',
    }[constant] || '');

const getFeedingDisplayValue = (constant) =>
    ({
        [FEEDING.BOTTLE]: 'Bottle',
        [FEEDING.BREAST]: 'Breast',
        [FEEDING.EXPRESSION]: 'Expression',
    }[constant] || '');

const getBreastDisplayValue = (constant) =>
    ({
        [BREAST.BOTH]: 'Both breasts',
        [BREAST.LEFT]: 'Left breast',
        [BREAST.RIGHT]: 'Right breast',
    }[constant] || '');

const getDiaperDisplayValue = (constant) =>
    ({
        [DIAPER.DIRTY]: 'Dirty',
        [DIAPER.WET]: 'Wet',
        [DIAPER.BOTH]: 'Both',
    }[constant] || '');

const getDurationDisplayValue = (hours, minutes) => {
    const hoursValue = toNumber(hours);
    const minutesValue = toNumber(minutes);
    const hoursLabel = hoursValue === 1 ? `${hoursValue} hour` : `${hoursValue} hours`;
    const minutesLabel = minutesValue === 1 ? `${minutesValue} minutes` : `${minutesValue} minutes`;

    if (hoursValue && minutesValue) {
        return `${hoursLabel} and ${minutesLabel}`;
    } else if (hoursValue) {
        return `${hoursLabel}`;
    } else if (minutesValue) {
        return `${minutesLabel}`;
    } else {
        return '';
    }
};

const getMealTypeDisplayValue = (constant) =>
    ({
        [MEAL_TYPE.BREAKFAST]: 'Breakfast',
        [MEAL_TYPE.LUNCH]: 'Lunch',
        [MEAL_TYPE.DINNER]: 'Dinner',
        [MEAL_TYPE.SNACK]: 'Snack',
    }[constant] || '');

const formatEvent = ({event, mealType}) => {
    if (mealType) {
        return getMealTypeDisplayValue(mealType);
    }
    return getEventDisplayValue(event);
}

const formatEventDetails = ({
    amount,
    breast,
    diaper,
    description,
    durationHours,
    durationMinutes,
    event,
    feeding,
    meal,
    unit,
}) => {
    switch (event) {
        case EVENT.DIAPER:
            return `${getDiaperDisplayValue(diaper)}`;
        case EVENT.FEEDING:
            return feeding === FEEDING.BREAST
                ? `${getBreastDisplayValue(breast)}, ${getDurationDisplayValue(
                      durationHours,
                      durationMinutes
                  )}`
                : `${getFeedingDisplayValue(feeding)}, ${amount} ${unit}`;
        case EVENT.PUMPING:
            return `Pumped ${amount} ${unit}`;
        case EVENT.MEAL:
            return meal;
        case EVENT.OTHER:
            return durationHours || durationMinutes
                ? `${description}, ${getDurationDisplayValue(durationHours, durationMinutes)}`
                : `${description}`;
        default:
            return '';
    }
};

export default () => {
    return {
        formatEvent,
        formatEventDetails,
    };
};
