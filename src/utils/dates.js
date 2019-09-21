import moment from 'moment';

const DATE_KEY_FORMAT = "YYYY-MM-DD";
const DATE_DISPLAY_FORMAT = "dddd MMMM Do YYYY";

export const toDisplayDate = (dateKey) => moment(dateKey).format(DATE_DISPLAY_FORMAT);

export const currentDateKey = () => moment().format(DATE_KEY_FORMAT);
