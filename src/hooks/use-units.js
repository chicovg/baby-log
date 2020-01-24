import {OZ, CUP, QUART, ML} from '../utils/units';

const unitOptions = [OZ, CUP, QUART, ML].map((unit) => ({
    key: unit,
    text: unit,
    value: unit,
}));

export default () => {
    return {
        unitOptions,
    }
};
