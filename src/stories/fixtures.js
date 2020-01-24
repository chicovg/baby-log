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
    title: 'My Baby\'s Log',
    unit: 'fl. oz.',
};

const defaultDates = ['2020-01-01', '2020-01-02', '2020-01-03', '2020-01-04', '2020-01-05', '2020-01-06', '2020-01-07'];
const defaultDiapers = [DIAPER.BOTH, DIAPER.DIRTY, DIAPER.WET];
const defaultEvents = [EVENT.DIAPER, EVENT.FEEDING, EVENT.PUMPING];
const defaultFeedings = [FEEDING.BOTTLE, FEEDING.BREAST];
const defaultBreasts = [BREAST.LEFT, BREAST.RIGHT, BREAST.BOTH];

export const generateEntries = ({
    breasts = defaultBreasts,
    count = 200,
    dates = defaultDates,
    diapers = defaultDiapers,
    events = defaultEvents,
    feedings = defaultFeedings,
    maxAmount = 8,
    maxDuration = 60,
    seed,
    unit = 'fl. oz.',
}) => {
    const random = seedrandom(seed);

    return times((n) => {
        const date = dates[floor(random() * dates.length)];
        const event = events[floor(random() * events.length)];
        const isFeeding = event === EVENT.FEEDING;
        const isPumping = event === EVENT.PUMPING;
        const feeding = isFeeding
              ? feedings[floor(random() * feedings.length)]
              : null;
        const diaper = isFeeding
              ? null
              : diapers[floor(random() * diapers.length)];
        const isBottle = feeding === FEEDING.BOTTLE;
        const breast = isBottle
              ? null
              : breasts[floor(random() * breasts.length)];
        const duration = isBottle
              ? null
              : floor(random() * maxDuration);
        const amount = (isBottle || isPumping)
              ? floor(random() * maxAmount)
              : null;
        const hours = padCharsStart('0', 2, floor(random() * 24));
        const minutes = padCharsStart('0', 2, floor(random() * 60));
        const time = `${hours}:${minutes}`;
        const unitValue = (isBottle || isPumping) ? unit : null;

        return {
            amount,
            breast,
            date,
            diaper,
            duration,
            event,
            feeding,
            id: `${n}`,
            logId,
            time,
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
