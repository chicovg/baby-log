import { selectLastUserLogDate, selectUserLogEntries } from './selectors';

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
    userId,
    {
        entries,
    }
);

const entries = {
    e1: {
        date: '2019-03-14',
        time: '10:12',
        logId: 'log1',
    },
    e2: {
        date: '2019-03-14',
        time: '04:35',
        logId: 'log1',
    },
    e3: {
        date: '2019-03-14',
        time: '22:30',
        logId: 'log1',
    },
    e4: {
        date: '2019-03-14',
        time: '01:00',
        logId: 'log2',
    },
    e5: {
        date: '2019-03-15',
        time: '00:12',
        logId: 'log1',
    }
};

describe('selectUserLogEntries', () => {
    it('selects log entries by date and sorts them', () => {
        const userId = 'abc123';
        const logId = 'log1';
        const state = entriesData(userId, entries);
        const sortedFilteredEntries = [
            {
                id: 'e2',
                date: '2019-03-14',
                time: '04:35',
                logId,
            },
            {
                id: 'e1',
                date: '2019-03-14',
                time: '10:12',
                logId,
            },
            {
                id: 'e3',
                date: '2019-03-14',
                time: '22:30',
                logId,
            },
        ];

        expect(selectUserLogEntries(userId, logId, '2019-03-14')(state))
            .toEqual(sortedFilteredEntries);
    });
});

describe('selectLastUserLogDate', () => {
    const userId = 'abc123';
    const logId = 'log1';
    const state = entriesData(userId, entries);

    expect(selectLastUserLogDate(userId, logId)(state))
        .toBe('2019-03-15');
});
