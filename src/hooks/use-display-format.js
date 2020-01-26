import compose from 'lodash/fp/compose';
import get from 'lodash/fp/get';

import {EVENT, FEEDING, BREAST, DIAPER} from '../utils/constants';

const getEventDisplayValue = (constant) =>
    ({
        [EVENT.DIAPER]: 'Diaper',
        [EVENT.FEEDING]: 'Feeding',
        [EVENT.PUMPING]: 'Pumping',
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

const getDurationDisplayValue = (d) => d > 1 ? `${d} minutes` : `${d} minute`;

const formatEvent = compose(getEventDisplayValue, get('event'));

const formatEventDetails = ({amount, breast, diaper, duration, event, feeding, unit}) => {
    switch (event) {
        case EVENT.DIAPER:
            return `${getDiaperDisplayValue(diaper)}`;
        case EVENT.FEEDING:
            return feeding === FEEDING.BREAST
                ? `${getBreastDisplayValue(breast)}, ${getDurationDisplayValue(duration)}`
                : `${getFeedingDisplayValue(feeding)}, ${amount} ${unit}`;
        case EVENT.PUMPING:
            return `Pumped ${amount} ${unit}`;
        default:
            return '';
    }
};

export default () => {
    return {
        formatEvent,
        formatEventDetails,
    };
}
