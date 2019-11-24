import moment from 'moment';

export const DATE_KEY_FORMAT = "YYYY-MM-DD";
export const TIME_KEY_FORMAT = 'HH:mm';
const DATE_DISPLAY_FORMAT = "ddd MMM Do YYYY";
const SHORT_DATE_DISPLAY_FORMAT = "ddd MMM Do";
const SUMMARY_DATE_DISPLAY_FORMAT = "ddd MM/DD";
const TIME_DISPLAY_FORMAT = "h:mm A";
const DATETIME_KEY_FORMAT = `${DATE_KEY_FORMAT} ${TIME_KEY_FORMAT}`;
const DATETIME_DISPLAY_FORMAT = `${DATE_DISPLAY_FORMAT} ${TIME_DISPLAY_FORMAT}`;

export const toDisplayDate = (dateKey) =>
    moment(dateKey).format(DATE_DISPLAY_FORMAT);

export const toShortDisplayDate = dateKey =>
    moment(dateKey).format(SHORT_DATE_DISPLAY_FORMAT);

export const toSummaryDisplayDate = dateKey =>
    moment(dateKey).format(SUMMARY_DATE_DISPLAY_FORMAT);

export const toDateTime = (date, time) =>
    moment(`${date} ${time}`, DATETIME_KEY_FORMAT);

export const toDisplayTime = (dateKey) => (timeKey) =>
    toDateTime(dateKey, timeKey).format(TIME_DISPLAY_FORMAT);

export const toStoredTime = (date) => (time) =>
    moment(
        `${date} ${time}`,
        DATETIME_DISPLAY_FORMAT,
    )
    .format(TIME_KEY_FORMAT);


export const currentDateKey = () => moment().format(DATE_KEY_FORMAT);

export const previousDateKey = (date) => moment(date).subtract(1, 'days').format(DATE_KEY_FORMAT);

export const nextDateKey = (date) => moment(date).add(1, 'days').format(DATE_KEY_FORMAT);

export const currentTime = () => moment().format(TIME_KEY_FORMAT);
