import moment from 'moment';

export const DATE_KEY_FORMAT = "YYYY-MM-DD";
const DATE_DISPLAY_FORMAT = "dddd MMMM Do YYYY";
const SHORT_DATE_DISPLAY_FORMAT = "dddd MMM Do";
const TIME_KEY_FORMAT = 'HH:mm';
const TIME_DISPLAY_FORMAT = "h:mm A";

export const toDisplayDate = (dateKey) => moment(dateKey).format(DATE_DISPLAY_FORMAT);

export const toDisplayTime = (dateKey) => (timeValue) => moment(`${dateKey} ${timeValue}`, `${DATE_KEY_FORMAT} ${TIME_KEY_FORMAT}`).format(TIME_DISPLAY_FORMAT);

export const toTimeKey = (dateKey) => (timeValue) => moment(`${dateKey} ${timeValue}`, `${DATE_KEY_FORMAT} ${TIME_DISPLAY_FORMAT}`).format(TIME_KEY_FORMAT);

export const toShortDisplayDate = dateKey => moment(dateKey).format(SHORT_DATE_DISPLAY_FORMAT);

export const currentDateKey = () => moment().format(DATE_KEY_FORMAT);

export const previousDateKey = (date) => moment(date).subtract(1, 'days').format(DATE_KEY_FORMAT);

export const nextDateKey = (date) => moment(date).add(1, 'days').format(DATE_KEY_FORMAT);

export const currentTime = () => moment().format(TIME_DISPLAY_FORMAT);
