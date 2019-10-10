import {
    FEEDING,
    BREAST,
    DIAPER,
} from '../utils/constants';

export default (constant) => ({
    [FEEDING.BOTTLE]: 'Bottle',
    [BREAST.BOTH]: 'Left/Right',
    [BREAST.LEFT]: 'Left',
    [BREAST.RIGHT]: 'Right',
    [DIAPER.DIRTY]: 'Dirty',
    [DIAPER.WET]: 'Wet',
})[constant] || '';