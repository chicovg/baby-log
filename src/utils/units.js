import __ from 'lodash/fp/__';
import curry from 'lodash/fp/curry';
import divide from 'lodash/fp/divide';
import getOr from 'lodash/fp/getOr';
import identity from 'lodash/fp/identity';
import multiply from 'lodash/fp/multiply';
import roundTo from './roundTo';

export const OZ='fl. oz.';
export const CUP='cup';
export const QUART='quart';
export const ML='mL';

const conversions = {
    [OZ]: {
        [CUP]: divide(__, 8),
        [QUART]: divide(__, 32),
        [ML]: multiply(29.5735),
    },
    [CUP]: {
        [OZ]: multiply(8),
        [QUART]: divide(__, 4),
        [ML]: multiply(262.588),
    },
    [QUART]: {
        [OZ]: multiply(32),
        [CUP]: multiply(4),
        [ML]: multiply(946.353),
    },
    [ML]: {
        [OZ]: divide(__, 29.5735),
        [CUP]: divide(__, 237),
        [QUART]: divide(__, 946),
    },
};

export const convert = curry((from, to, value) =>
    roundTo(4, getOr(identity, [from, to], conversions)(value))
);
