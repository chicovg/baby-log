import moment from 'moment';

export const DATE_KEY_FORMAT = "YYYY-MM-DD";
const DATE_DISPLAY_FORMAT = "dddd MMMM Do YYYY";
const SHORT_DATE_DISPLAY_FORMAT = "dddd MMM Do";
const TIME_FORMAT = "HH:mm";

export const toDisplayDate = (dateKey) => moment(dateKey).format(DATE_DISPLAY_FORMAT);

export const toShortDisplayDate = dateKey => moment(dateKey).format(SHORT_DATE_DISPLAY_FORMAT);

export const currentDateKey = () => moment().format(DATE_KEY_FORMAT);

export const previousDateKey = (date) => moment(date).subtract(1, 'days').format(DATE_KEY_FORMAT);

export const nextDateKey = (date) => moment(date).add(1, 'days').format(DATE_KEY_FORMAT);

export const currentTime = () => moment().format(TIME_FORMAT);
