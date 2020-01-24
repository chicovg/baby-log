import {EVENT, FEEDING, BREAST, DIAPER} from '../utils/constants';

const getDisplayValue = (constant) =>
    ({
        [EVENT.PUMPING]: 'Pumped',
        [FEEDING.BOTTLE]: 'Bottle',
        [FEEDING.EXPRESSION]: 'Expression',
        [BREAST.BOTH]: 'Both breasts',
        [BREAST.LEFT]: 'Left breast',
        [BREAST.RIGHT]: 'Right breast',
        [DIAPER.DIRTY]: 'Dirty',
        [DIAPER.WET]: 'Wet',
        [DIAPER.BOTH]: 'Both',
    }[constant] || '');

const getDurationDisplay = (d) => d > 1 ? `${d} minutes` : `${d} minute`;

const formatEventDetails = ({amount, breast, diaper, duration, event, feeding, unit}) => {
    switch (event) {
        case EVENT.DIAPER:
            return `${getDisplayValue(diaper)} diaper`;
        case EVENT.FEEDING:
            return feeding === FEEDING.BREAST
                ? `${getDisplayValue(breast)}, ${getDurationDisplay(duration)}`
                : `${getDisplayValue(feeding)}, ${amount} ${unit}`;
        case EVENT.PUMPING:
            return `${getDisplayValue(event)} ${amount} ${unit}`;
        default:
            return '';
    }
};

export default () => {
    return {
        formatEventDetails,
    };
}
