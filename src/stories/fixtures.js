import {action} from '@storybook/addon-actions';

import floor from 'lodash/fp/floor';
import times from 'lodash/fp/times';
import seedrandom from 'seedrandom';

import {EVENT, FEEDING, BREAST} from '../utils/constants';

export const userId = 'abc1234';
export const logId = 'yyz678';
export const log = {
    id: logId,
    title: 'My Baby\'s Log',
    unit: 'fl. oz.',
};

const defaultDates = ['2020-01-01', '2020-01-02', '2020-01-03', '2020-01-04', '2020-01-05', '2020-01-06', '2020-01-07'];
const defaultEvents = [EVENT.DIAPER, EVENT.FEEDING, EVENT.PUMPING];
const defaultFeedings = [FEEDING.BOTTLE, FEEDING.BREAST];
const defaultBreasts = [BREAST.LEFT, BREAST.RIGHT, BREAST.BOTH];

export const generateEntries = ({
    breasts = defaultBreasts,
    count = 200,
    dates = defaultDates,
    events = defaultEvents,
    feedings = defaultFeedings,
    maxAmount = 8,
    maxDuration = 60,
    seed,
    unit = 'fl. oz.',
}) => {
    const amountRandom = seedrandom(`${seed}-amount`);
    const breastRandom = seedrandom(`${seed}-breast`);
    const dateRandom = seedrandom(`${seed}-dates`);
    const durationRandom = seedrandom(`${seed}-duration`);
    const eventRandom = seedrandom(`${seed}-events`);
    const feedingRandom = seedrandom(`${seed}-feedings`);

    return times((n) => {
        const date = dates[floor(dateRandom() * dates.length)];
        const event = events[floor(eventRandom() * events.length)];
        const isFeeding = event === EVENT.FEEDING;
        const isPumping = event === EVENT.PUMPING;
        const feeding = isFeeding
              ? feedings[floor(feedingRandom() * feedings.length)]
              : null;
        const isBottle = feeding === FEEDING.BOTTLE;
        const breast = isBottle
              ? null
              : breasts[floor(breastRandom() * breasts.length)];
        const duration = isBottle
              ? null
              : floor(durationRandom() * maxDuration);
        const amount = (isBottle || isPumping)
              ? floor(amountRandom() * maxAmount)
              : null;
        const unitValue = (isBottle || isPumping) ? unit : null;

        return {
            amount,
            breast,
            date,
            duration,
            event,
            feeding,
            id: `${n}`,
            logId,
            unit: unitValue,
        };
    }, count).reduce((prev, curr) => ({...prev, [curr.id]: curr}), {});
};

export const mockStore = ({
    entries = {},
    logs = {},
    uid = userId,
}) => ({
    getState: () => ({
        firebase: {
            auth: {
                uid,
            }
        },
        firestore: {
            data: {
                users: {
                    [uid]: {
                        entries,
                        logs,
                    }
                }
            }
        },
    }),
    dispatch: action('dispatch', {allowFunction: true}),
    subscribe: action('subscribe', {allowFunction: true}),
});
