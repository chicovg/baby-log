import {
    goToHome,
    goToEntriesForDate,
    loginToFirebase,
    saveNewLog,
    saveUpdatedLog,
    deleteLog,
    saveNewEntry,
    saveUpdatedEntry,
    deleteEntry,
} from './index';

describe('goToHome', () => {
    it('updates the location to home', () => {
        goToHome();
        expect(global.window.location.hash).toBe('#/');
    });
});

describe('goToEntriesForDate', () => {
    it('updates the location to the entries view for the date', () => {
        const logId = 'abc';
        const date = '2020-01-01';

        goToEntriesForDate(logId, date)();
        expect(global.window.location.hash).toBe(`#/logs/${logId}/entries/${date}`);
    });
});

describe('loginToFirebase', () => {
    it('calls the firebase login function', () => {
        const dispatch = jest.fn();
        const getState = jest.fn();
        const login = jest.fn();
        const getFirebase = () => ({login});

        loginToFirebase(dispatch, getState, {getFirebase});

        expect(dispatch.mock.calls.length).toBe(0);
        expect(getState.mock.calls.length).toBe(0);
        expect(login.mock.calls[0][0]).toStrictEqual({provider: 'google', type: 'redirect'});
    })
});

const mockFireStore = () => {
    const add = jest.fn();
    const collection = jest.fn();
    const deleteFn = jest.fn();
    const doc = jest.fn();
    const set = jest.fn();
    const firestore = {
        add,
        collection,
        delete: deleteFn,
        doc,
        set,
    };
    add.mockResolvedValue(true);
    collection.mockReturnValue(firestore);
    deleteFn.mockResolvedValue(true);
    doc.mockReturnValue(firestore);
    set.mockResolvedValue(true);

    return firestore;
};

describe('saveNewLog', () => {
    it('calls firestore with the expected args', async () => {
        const dispatch = jest.fn();
        const getState = jest.fn();
        const firestore = mockFireStore();
        const getFirestore = () => firestore;

        const userId = 'xxy';
        const log = {name: 'log'};

        await saveNewLog({userId, log})(dispatch, getState, {getFirestore});

        expect(dispatch.mock.calls.length).toBe(1);
        expect(getState.mock.calls.length).toBe(0);
        expect(firestore.add.mock.calls[0][0]).toBe(log);
        expect(firestore.collection.mock.calls[0][0]).toBe('usersv1');
        expect(firestore.collection.mock.calls[1][0]).toBe('logs');
        expect(firestore.doc.mock.calls[0][0]).toBe(userId);
    })
});

describe('saveUpdatedLog', () => {
    it('calls firestore with the expected args', async () => {
        const dispatch = jest.fn();
        const getState = jest.fn();
        const firestore = mockFireStore();
        const getFirestore = () => firestore;

        const userId = 'xxy';
        const logId = 'foo';
        const log = {id: 'foo', name: 'log'};

        await saveUpdatedLog({userId, logId, log})(dispatch, getState, {getFirestore});

        expect(dispatch.mock.calls.length).toBe(1);
        expect(getState.mock.calls.length).toBe(0);
        expect(firestore.collection.mock.calls[0][0]).toBe('usersv1');
        expect(firestore.collection.mock.calls[1][0]).toBe('logs');
        expect(firestore.doc.mock.calls[0][0]).toBe(userId);
        expect(firestore.set.mock.calls[0][0]).toBe(log);
    })
});

describe('deleteLog', () => {
    it('calls firestore with the expected args', async () => {
        const dispatch = jest.fn();
        const getState = jest.fn();
        const firestore = mockFireStore();
        const getFirestore = () => firestore;

        const userId = 'xxy';
        const logId = 'alog';

        await deleteLog({userId, logId})(dispatch, getState, {getFirestore});

        expect(dispatch.mock.calls.length).toBe(1);
        expect(getState.mock.calls.length).toBe(0);
        expect(firestore.collection.mock.calls[0][0]).toBe('usersv1');
        expect(firestore.collection.mock.calls[1][0]).toBe('logs');
        expect(firestore.delete.mock.calls.length).toBe(1);
        expect(firestore.doc.mock.calls[0][0]).toBe(userId);
    })
});

describe('saveNewEntry', () => {
    it('calls firestore with the expected args', async () => {
        const dispatch = jest.fn();
        const getState = jest.fn();
        const firestore = mockFireStore();
        const getFirestore = () => firestore;

        const userId = 'xxy';
        const logId = 'alog';
        const entry = {notes: 'test'};

        await saveNewEntry({userId, logId, entry})(dispatch, getState, {getFirestore});

        expect(dispatch.mock.calls.length).toBe(1);
        expect(getState.mock.calls.length).toBe(0);
        expect(firestore.add.mock.calls[0][0]).toStrictEqual(entry);
        expect(firestore.collection.mock.calls[0][0]).toBe('usersv1');
        expect(firestore.collection.mock.calls[1][0]).toBe('entries');
        expect(firestore.doc.mock.calls[0][0]).toBe(userId);
    })
});

describe('saveUpdatedEntry', () => {
    it('calls firestore with the expected args', async () => {
        const dispatch = jest.fn();
        const getState = jest.fn();
        const firestore = mockFireStore();
        const getFirestore = () => firestore;

        const userId = 'xxy';
        const logId = 'alog';
        const id = 'foo';
        const entry = {id, notes: 'test'};

        await saveUpdatedEntry({userId, logId, id, entry})(dispatch, getState, {getFirestore});

        expect(dispatch.mock.calls.length).toBe(1);
        expect(getState.mock.calls.length).toBe(0);
        expect(firestore.collection.mock.calls[0][0]).toBe('usersv1');
        expect(firestore.collection.mock.calls[1][0]).toBe('entries');
        expect(firestore.doc.mock.calls[0][0]).toBe(userId);
        expect(firestore.set.mock.calls[0][0]).toStrictEqual(entry);
    })
});

describe('deleteEntry', () => {
    it('calls firestore with the expected args', async () => {
        const dispatch = jest.fn();
        const getState = jest.fn();
        const firestore = mockFireStore();
        const getFirestore = () => firestore;

        const userId = 'xxy';
        const logId = 'alog';
        const id = 'tto';
        const date = '2020-01-01';

        await deleteEntry({userId, logId, id, date})(dispatch, getState, {getFirestore});

        expect(dispatch.mock.calls.length).toBe(1);
        expect(getState.mock.calls.length).toBe(0);
        expect(firestore.collection.mock.calls[0][0]).toBe('usersv1');
        expect(firestore.collection.mock.calls[1][0]).toBe('entries');
        expect(firestore.delete.mock.calls.length).toBe(1);
        expect(firestore.doc.mock.calls[0][0]).toBe(userId);
    })
});
