import {EVENT, FEEDING, BREAST, DIAPER} from '../utils/constants';

export default (constant) =>
    ({
        [EVENT.PUMPING]: 'Pumped',
        [FEEDING.BOTTLE]: 'Bottle',
        [FEEDING.EXPRESSION]: 'Expression',
        [BREAST.BOTH]: 'Left/Right',
        [BREAST.LEFT]: 'Left',
        [BREAST.RIGHT]: 'Right',
        [DIAPER.DIRTY]: 'Dirty',
        [DIAPER.WET]: 'Wet',
        [DIAPER.BOTH]: 'Both',
    }[constant] || '');
