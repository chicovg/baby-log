import {
    selectLastUserLogDate,
    selectUserLogEntriesForDate,
    selectUserLogSummaries,
    selectUserLogEntry,
} from './index';
import {EVENT, FEEDING} from '../utils/constants';

const firestoreData = (data) => ({
    firestore: {
        data,
    },
});

const userData = (userId, data) =>
    firestoreData({
        users: {
            [userId]: data,
        },
    });

const entriesData = (userId, entries) =>
    userData(userId, {
        entries,
    });

const entries = {
    '03150012': {
        date: '2019-03-15',
        time: '00:12',
        logId: 'log1',
        event: EVENT.DIAPER,
    },
    '03141012': {
        date: '2019-03-14',
        time: '10:12',
        logId: 'log1',
        event: EVENT.DIAPER,
    },
    '03141130': {
        date: '2019-03-14',
        time: '11:30',
        logId: 'log1',
        event: EVENT.PUMPING,
        amount: 4,
        unit: 'fl. oz.',
    },
    '03140435': {
        date: '2019-03-14',
        time: '04:35',
        logId: 'log1',
        event: EVENT.FEEDING,
        feeding: FEEDING.BOTTLE,
        amount: 2,
        unit: 'fl. oz.',
    },
    '03142230': {
        date: '2019-03-14',
        time: '22:30',
        logId: 'log1',
        event: EVENT.FEEDING,
        feeding: FEEDING.BREAST,
    },
    '03140100': {
        date: '2019-03-14',
        time: '01:00',
        logId: 'log2',
        event: EVENT.DIAPER,
    },
    '03130834': {
        date: '2019-03-13',
        time: '8:34',
        logId: 'log1',
        event: EVENT.FEEDING,
        feeding: FEEDING.BOTTLE,
        amount: 2,
        unit: 'fl. oz.',
    },
    '03121056': {
        date: '2019-03-12',
        time: '10:56',
        logId: 'log1',
        event: EVENT.FEEDING,
        feeding: FEEDING.BOTTLE,
        amount: 1,
        unit: 'cup',
    },
    '03111231': {
        date: '2019-03-11',
        time: '12:31',
        logId: 'log1',
        event: EVENT.DIAPER,
    },
    '03111837': {
        date: '2019-03-11',
        time: '18:37',
        logId: 'log1',
        event: EVENT.FEEDING,
        feeding: FEEDING.BREAST,
    },
    '03101422': {
        date: '2019-03-10',
        time: '14:22',
        logId: 'log1',
        event: EVENT.DIAPER,
    },
    '03101530': {
        date: '2019-03-10',
        time: '15:30',
        logId: 'log1',
        event: EVENT.PUMPING,
        amount: 2,
        unit: 'quart',
    },
    '03102305': {
        date: '2019-03-10',
        time: '23:05',
        logId: 'log1',
        event: EVENT.DIAPER,
    },
    '03090532': {
        date: '2019-03-09',
        time: '5:32',
        logId: 'log1',
        event: EVENT.DIAPER,
    },
    '03081056': {
        date: '2019-03-08',
        time: '10:56',
        logId: 'log1',
        event: EVENT.FEEDING,
        feeding: FEEDING.BREAST,
    },
    '03071056': {
        date: '2019-03-07',
        time: '10:56',
        logId: 'log1',
        event: EVENT.FEEDING,
        feeding: FEEDING.BOTTLE,
        amount: 4,
        unit: 'fl. oz.',
    },
    '03061056': {
        date: '2019-03-06',
        time: '10:56',
        logId: 'log1',
        event: EVENT.DIAPER,
    },
};

describe('selectUserLogEntriesForDate', () => {
    it('selects log entries by date and sorts them', () => {
        const userId = 'abc123';
        const logId = 'log1';
        const state = entriesData(userId, entries);
        const sortedFilteredEntries = [
            {
                logId,
                id: '03140435',
                amount: 2,
                date: '2019-03-14',
                event: EVENT.FEEDING,
                feeding: FEEDING.BOTTLE,
                time: '04:35',
                unit: 'fl. oz.',
            },
            {
                logId,
                id: '03141012',
                date: '2019-03-14',
                event: EVENT.DIAPER,
                time: '10:12',
            },
            {
                logId,
                id: '03141130',
                amount: 4,
                date: '2019-03-14',
                event: EVENT.PUMPING,
                time: '11:30',
                unit: 'fl. oz.',
            },
            {
                logId,
                id: '03142230',
                date: '2019-03-14',
                event: EVENT.FEEDING,
                feeding: FEEDING.BREAST,
                time: '22:30',
            },
        ];

        expect(selectUserLogEntriesForDate(userId, logId, '2019-03-14')(state)).toEqual(
            sortedFilteredEntries
        );
    });
});

describe('selectLastUserLogDate', () => {
    it('selects the most recent log date', () => {
        const userId = 'abc123';
        const logId = 'log1';
        const state = entriesData(userId, entries);

        expect(selectLastUserLogDate(userId, logId)(state)).toBe('2019-03-15');
    });
});

describe('selectUserLogEntry', () => {
    it('selects the log entry by id', () => {
        const userId = 'abc123';
        const logId = 'log1';
        const entryId = '03141012';
        const state = entriesData(userId, entries);

        expect(selectUserLogEntry(userId, logId, entryId)(state)).toStrictEqual({
            date: '2019-03-14',
            time: '10:12',
            logId: 'log1',
            event: EVENT.DIAPER,
        });
    });
});

describe('selectUserLogSummaries', () => {
    it('summarizes the last 7 days worth of data', () => {
        const userId = 'abc123';
        const logId = 'log1';
        const unit = 'fl. oz.';
        const state = entriesData(userId, entries);

        expect(selectUserLogSummaries(userId, logId, unit)(state)).toStrictEqual([
            {
                diapers: 1,
                feedings: 0,
                id: '2019-03-15',
                pumped: 0,
            },
            {
                diapers: 1,
                feedings: 2,
                id: '2019-03-14',
                pumped: 2,
            },
            {
                diapers: 0,
                feedings: 1,
                id: '2019-03-13',
                pumped: -2,
            },
            {
                diapers: 0,
                feedings: 1,
                id: '2019-03-12',
                pumped: -8,
            },
            {
                diapers: 1,
                feedings: 1,
                id: '2019-03-11',
                pumped: 0,
            },
            {
                diapers: 2,
                feedings: 0,
                id: '2019-03-10',
                pumped: 64,
            },
            {
                diapers: 1,
                feedings: 0,
                id: '2019-03-09',
                pumped: 0,
            },
        ]);
    });
});
