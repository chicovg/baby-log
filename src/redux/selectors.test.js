import {
    selectLastUserLogDate,
    selectUserLogEntriesForDate,
    selectUserLogSummaries,
    selectUserLogEntry
} from './selectors';
import {
    EVENT
} from '../utils/constants';

const firestoreData = data => ({
    firestore: {
        data,
    }
});

const userData = (userId, data) => firestoreData({
    users: {
        [userId]: data,
    },
});

const entriesData = (userId, entries) => userData(
    userId, {
        entries,
    }
);

const entries = {
    e1: {
        date: '2019-03-14',
        time: '10:12',
        logId: 'log1',
        event: EVENT.DIAPER,
    },
    e2: {
        date: '2019-03-14',
        time: '04:35',
        logId: 'log1',
        event: EVENT.FEEDING,
    },
    e3: {
        date: '2019-03-14',
        time: '22:30',
        logId: 'log1',
        event: EVENT.FEEDING,
    },
    e4: {
        date: '2019-03-14',
        time: '01:00',
        logId: 'log2',
        event: EVENT.DIAPER,
    },
    e5: {
        date: '2019-03-15',
        time: '00:12',
        logId: 'log1',
        event: EVENT.DIAPER,
    },
    e6: {
        date: '2019-03-13',
        time: '8:34',
        logId: 'log1',
        event: EVENT.FEEDING,
    },
    e7: {
        date: '2019-03-12',
        time: '10:56',
        logId: 'log1',
        event: EVENT.FEEDING,
    },
    e8: {
        date: '2019-03-11',
        time: '12:31',
        logId: 'log1',
        event: EVENT.DIAPER,
    },
    e9: {
        date: '2019-03-11',
        time: '18:37',
        logId: 'log1',
        event: EVENT.FEEDING,
    },
    e10: {
        date: '2019-03-10',
        time: '14:22',
        logId: 'log1',
        event: EVENT.DIAPER,
    },
    e11: {
        date: '2019-03-10',
        time: '23:05',
        logId: 'log1',
        event: EVENT.DIAPER,
    },
    e12: {
        date: '2019-03-09',
        time: '5:32',
        logId: 'log1',
        event: EVENT.DIAPER,
    },
    e13: {
        date: '2019-03-08',
        time: '10:56',
        logId: 'log1',
        event: EVENT.FEEDING,
    },
    e14: {
        date: '2019-03-07',
        time: '10:56',
        logId: 'log1',
        event: EVENT.FEEDING,
    },
    e15: {
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
        const sortedFilteredEntries = [{
                id: 'e2',
                date: '2019-03-14',
                event: EVENT.FEEDING,
                time: '04:35',
                logId,
            },
            {
                id: 'e1',
                date: '2019-03-14',
                event: EVENT.DIAPER,
                time: '10:12',
                logId,
            },
            {
                id: 'e3',
                date: '2019-03-14',
                event: EVENT.FEEDING,
                time: '22:30',
                logId,
            },
        ];

        expect(selectUserLogEntriesForDate(
                userId,
                logId,
                '2019-03-14',
            )(state))
            .toEqual(sortedFilteredEntries);
    });
});

describe('selectLastUserLogDate', () => {
    it('selects the most recent log date', () => {
        const userId = 'abc123';
        const logId = 'log1';
        const state = entriesData(userId, entries);

        expect(selectLastUserLogDate(userId, logId)(state))
            .toBe('2019-03-15');
    });
});

describe('selectUserLogEntry', () => {
    it('selects the log entry by id', () => {
        const userId = 'abc123';
        const logId = 'log1';
        const entryId = 'e1';
        const state = entriesData(userId, entries);

        expect(selectUserLogEntry(
                userId,
                logId,
                entryId,
            )(state))
            .toStrictEqual({
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
        const state = entriesData(userId, entries);

        expect(selectUserLogSummaries(userId, logId)(state))
            .toStrictEqual([
                {
                    diapers: 1,
                    feedings: 0,
                    id: "2019-03-15",
                },
                {
                    diapers: 1,
                    feedings: 2,
                    id: "2019-03-14",
                },
                {
                    diapers: 0,
                    feedings: 1,
                    id: "2019-03-13",
                },
                {
                    diapers: 0,
                    feedings: 1,
                    id: "2019-03-12",
                },
                {
                    diapers: 1,
                    feedings: 1,
                    id: "2019-03-11",
                },
                {
                    diapers: 2,
                    feedings: 0,
                    id: "2019-03-10",
                },
                {
                    diapers: 1,
                    feedings: 0,
                    id: "2019-03-09",
                },
            ]);
    });
});
