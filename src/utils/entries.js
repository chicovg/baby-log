import { toDisplayTime, toStoredTime } from '../utils/dates';

export const toDisplayedEntry = entry => ({
    ...entry,
    time: toDisplayTime(entry.date)(entry.time)
});

export const toStoredEntry = entry => ({
    ...entry,
    time: toStoredTime(entry.date)(entry.time),
});