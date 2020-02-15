import {action} from '@storybook/addon-actions';

import floor from 'lodash/fp/floor';
import padCharsStart from 'lodash/fp/padCharsStart';
import times from 'lodash/fp/times';
import seedrandom from 'seedrandom';

import {DIAPER, EVENT, FEEDING, BREAST} from '../utils/constants';

export const userId = 'abc1234';
export const logId = 'yyz678';
export const log = {
    id: logId,
    title: "My Baby's Log",
    babyName: 'Baby',
    unit: 'fl. oz.',
};

const defaultDates = [
    '2020-01-01',
    '2020-01-02',
    '2020-01-03',
    '2020-01-04',
    '2020-01-05',
    '2020-01-06',
    '2020-01-07',
];
const defaultDiapers = [DIAPER.BOTH, DIAPER.DIRTY, DIAPER.WET];
const defaultEvents = [EVENT.DIAPER, EVENT.FEEDING, EVENT.PUMPING, EVENT.OTHER];
const defaultFeedings = [FEEDING.BOTTLE, FEEDING.BREAST];
const defaultBreasts = [BREAST.LEFT, BREAST.RIGHT, BREAST.BOTH];
const defaultDescriptions = ['Nap', 'Bathtime', 'Walk'];

export const generateEntries = ({
    breasts = defaultBreasts,
    count = 200,
    dates = defaultDates,
    descriptions = defaultDescriptions,
    diapers = defaultDiapers,
    events = defaultEvents,
    feedings = defaultFeedings,
    maxAmount = 8,
    maxDurationHours = 4,
    maxDurationMinutes = 60,
    seed,
    unit = 'fl. oz.',
}) => {
    const random = seedrandom(seed);
    const randomInt = (max) => floor(random() * max);
    const when = (condition, valueFn) => (condition ? valueFn() : null);

    return times((n) => {
        const date = dates[randomInt(dates.length)];
        const event = events[randomInt(events.length)];
        const isDiaper = event === EVENT.DIAPER;
        const isFeeding = event === EVENT.FEEDING;
        const isPumping = event === EVENT.PUMPING;
        const isOther = event === EVENT.OTHER;
        const diaper = when(isDiaper, () => diapers[randomInt(diapers.length)]);
        const feeding = when(isFeeding, () => feedings[randomInt(feedings.length)]);
        const isBreast = feeding === FEEDING.BREAST;
        const isBottle = feeding === FEEDING.BOTTLE;
        const breast = when(isBreast, () => breasts[randomInt(breasts.length)]);
        const description = when(isOther, () => descriptions[randomInt(descriptions.length)]);
        const durationHours = when(isBreast || isOther, () => randomInt(maxDurationHours));
        const durationMinutes = when(isBreast || isOther, () => randomInt(maxDurationMinutes));
        const amount = when(isBottle || isPumping, () => randomInt(maxAmount));
        const hours = padCharsStart('0', 2, randomInt(24));
        const minutes = padCharsStart('0', 2, randomInt(60));
        const time = `${hours}:${minutes}`;
        const unitValue = when(isBottle || isPumping, () => unit);

        return {
            amount,
            breast,
            date,
            diaper,
            description,
            durationHours,
            durationMinutes,
            event,
            feeding,
            id: `${n}`,
            logId,
            time,
            unit: unitValue,
        };
    }, count).reduce((prev, curr) => ({...prev, [curr.id]: curr}), {});
};

export const mockStore = ({entries = {}, logs = {}, uid = userId}) => ({
    getState: () => ({
        firebase: {
            auth: {
                uid,
            },
        },
        firestore: {
            data: {
                usersv2: {
                    [uid]: {
                        entries,
                        logs,
                    },
                },
            },
        },
    }),
    dispatch: action('dispatch', {allowFunction: true}),
    subscribe: action('subscribe', {allowFunction: true}),
});
