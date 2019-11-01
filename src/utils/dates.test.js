import moment from 'moment';
import {
    DATE_KEY_FORMAT,
    TIME_KEY_FORMAT,
    currentDateKey,
    currentTime,
    previousDateKey,
    nextDateKey,
    toDateTime,
    toDisplayDate,
    toDisplayTime,
    toShortDisplayDate,
    toStoredTime,
} from './dates';

describe.each`
    dateKey         | expected
    ${'2019-01-01'} | ${'Tue Jan 1st 2019'}
    ${'1982-06-10'} | ${'Thu Jun 10th 1982'}
    ${'2045-12-31'} | ${'Sun Dec 31st 2045'}
`('toDisplayDate($dateKey)', ({dateKey, expected}) => {
    it('returns ${expected}', () => {
        expect(toDisplayDate(dateKey)).toBe(expected);
    });
});

describe.each`
    dateKey         | expected
    ${'2019-01-01'} | ${'Tue Jan 1st'}
    ${'1982-06-10'} | ${'Thu Jun 10th'}
    ${'2045-12-31'} | ${'Sun Dec 31st'}
`('toShortDisplayDate($dateKey)', ({dateKey, expected}) => {
    it('returns ${expected}', () => {
        expect(toShortDisplayDate(dateKey)).toBe(expected);
    });
});

describe.each`
    timeKey    | expected
    ${'0:00'}  | ${'12:00 AM'}
    ${'00:00'} | ${'12:00 AM'}
    ${'09:34'}  | ${'9:34 AM'}
    ${'15:58'} | ${'3:58 PM'}
    ${'23:59'} | ${'11:59 PM'}
`('toDisplayTime($timeKey)', ({timeKey, expected}) => {
    const date = '2019-01-01';

    it('returns ${expected}', () => {
        expect(toDisplayTime(date)(timeKey)).toBe(expected);
    });
});

describe.each`
    time          | expected
    ${'12:00 AM'} | ${'00:00'}
    ${'7:15 AM'}  | ${'07:15'}
    ${'2:51 PM'}  | ${'14:51'}
`('toDisplayTime($time)', ({time, expected}) => {
    const date = 'Tue Jan 1st 2019';

    it('returns ${expected}', () => {
        expect(toStoredTime(date)(time)).toBe(expected);
    });
});

describe('currentDateKey', () => {
    it('is the current date', () => {
        expect(currentDateKey()).toBe(moment().format(DATE_KEY_FORMAT));
    });
});

describe('previousDateKey', () => {
    it('return the previous date', () => {
        expect(previousDateKey('2019-01-02')).toBe('2019-01-01');
    });
});

describe('nextDateKey', () => {
    it('returns the next date', () => {
        expect(nextDateKey('2019-01-01')).toBe('2019-01-02');
    });
});

describe('currentTime', () => {
    it('returns the current time', () => {
        expect(currentTime()).toBe(moment().format(TIME_KEY_FORMAT));
    });
});

describe('toDateTime', () => {
    let now = moment();

    const dateKey = now.format(DATE_KEY_FORMAT);
    const timeKey = now.format(TIME_KEY_FORMAT);

    now.seconds(0);
    now.milliseconds(0);

    expect(toDateTime(dateKey, timeKey).isSame(now)).toBeTruthy();
});
