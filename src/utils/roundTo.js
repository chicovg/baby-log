import curry from 'lodash/fp/curry';

export default curry((precision, value) => {
    const e = Math.pow(10, precision);

    return Math.round(value * e) / e;
});
