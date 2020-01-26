import sinon from 'sinon';
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
        let dispatch = sinon.stub();
        let getState = sinon.stub();
        let login = sinon.stub();
        let getFirebase = () => ({login});

        loginToFirebase(dispatch, getState, {getFirebase});

        expect(dispatch.called).toBeFalsy();
        expect(getState.called).toBeFalsy();
        expect(login.calledOnceWith({provider: 'google', type: 'redirect'}));
    })
});

describe('saveNewLog', () => {
    it('calls firestore with the expected args', async () => {
        let dispatch = sinon.stub();
        let getState = sinon.stub();
        let firestore = {
            add: sinon.stub().resolves(true),
            collection: sinon.stub().returnsThis(),
            doc: sinon.stub().returnsThis(),
        };
        let getFirestore = () => firestore;

        const userId = 'xxy';
        const log = {name: 'log'};

        await saveNewLog({userId, log})(dispatch, getState, {getFirestore});

        expect(dispatch.called).toBeTruthy();
        expect(getState.called).toBeFalsy();
        expect(firestore.add.calledOnceWith(log)).toBeTruthy();
        expect(firestore.collection.withArgs('usersv1').calledOnce).toBeTruthy();
        expect(firestore.collection.withArgs('logs').calledOnce).toBeTruthy();
        expect(firestore.doc.withArgs(userId).calledOnce).toBeTruthy();
    })
});

describe('saveUpdatedLog', () => {
    it('calls firestore with the expected args', async () => {
        let dispatch = sinon.stub();
        let getState = sinon.stub();
        let firestore = {
            collection: sinon.stub().returnsThis(),
            doc: sinon.stub().returnsThis(),
            set: sinon.stub().resolves(true),
        };
        let getFirestore = () => firestore;

        const userId = 'xxy';
        const logId = 'foo';
        const log = {id: 'foo', name: 'log'};

        await saveUpdatedLog({userId, logId, log})(dispatch, getState, {getFirestore});

        expect(dispatch.called).toBeTruthy();
        expect(getState.called).toBeFalsy();
        expect(firestore.collection.withArgs('usersv1').calledOnce).toBeTruthy();
        expect(firestore.collection.withArgs('logs').calledOnce).toBeTruthy();
        expect(firestore.doc.withArgs(userId).calledOnce).toBeTruthy();
        expect(firestore.doc.withArgs(logId).calledOnce).toBeTruthy();
        expect(firestore.set.calledOnceWith(log));
    })
});

describe('deleteLog', () => {
    it('calls firestore with the expected args', async () => {
        let dispatch = sinon.stub();
        let getState = sinon.stub();
        let firestore = {
            collection: sinon.stub().returnsThis(),
            delete: sinon.stub().resolves(true),
            doc: sinon.stub().returnsThis(),
        };
        let getFirestore = () => firestore;

        const userId = 'xxy';
        const logId = 'alog';

        await deleteLog({userId, logId})(dispatch, getState, {getFirestore});

        expect(dispatch.called).toBeTruthy();
        expect(getState.called).toBeFalsy();
        expect(firestore.collection.withArgs('usersv1').calledOnce).toBeTruthy();
        expect(firestore.collection.withArgs('logs').calledOnce).toBeTruthy();
        expect(firestore.delete.called).toBeTruthy();
        expect(firestore.doc.withArgs(userId).calledOnce).toBeTruthy();
        expect(firestore.doc.withArgs(logId).calledOnce).toBeTruthy();
    })
});

describe('saveNewEntry', () => {
    it('calls firestore with the expected args', async () => {
        let dispatch = sinon.stub();
        let getState = sinon.stub();
        let firestore = {
            add: sinon.stub().resolves(true),
            collection: sinon.stub().returnsThis(),
            doc: sinon.stub().returnsThis(),
        };
        let getFirestore = () => firestore;

        const userId = 'xxy';
        const logId = 'alog';
        const entry = {notes: 'test'};

        await saveNewEntry({userId, logId, entry})(dispatch, getState, {getFirestore});

        expect(dispatch.called).toBeTruthy();
        expect(getState.called).toBeFalsy();
        expect(firestore.add.calledOnceWith(entry)).toBeTruthy();
        expect(firestore.collection.withArgs('usersv1').calledOnce).toBeTruthy();
        expect(firestore.collection.withArgs('entries').calledOnce).toBeTruthy();
        expect(firestore.doc.withArgs(userId).calledOnce).toBeTruthy();
    })
});

describe('saveUpdatedEntry', () => {
    it('calls firestore with the expected args', async () => {
        let dispatch = sinon.stub();
        let getState = sinon.stub();
        let firestore = {
            collection: sinon.stub().returnsThis(),
            doc: sinon.stub().returnsThis(),
            set: sinon.stub().resolves(true),
        };
        let getFirestore = () => firestore;

        const userId = 'xxy';
        const logId = 'alog';
        const id = 'foo';
        const entry = {id, notes: 'test'};

        await saveUpdatedEntry({userId, logId, id, entry})(dispatch, getState, {getFirestore});

        expect(dispatch.called).toBeTruthy();
        expect(getState.called).toBeFalsy();
        expect(firestore.collection.withArgs('usersv1').calledOnce).toBeTruthy();
        expect(firestore.collection.withArgs('entries').calledOnce).toBeTruthy();
        expect(firestore.doc.withArgs(userId).calledOnce).toBeTruthy();
        expect(firestore.doc.withArgs(id).calledOnce).toBeTruthy();
        expect(firestore.set.calledOnceWith(entry));
    })
});

describe('deleteEntry', () => {
    it('calls firestore with the expected args', async () => {
        let dispatch = sinon.stub();
        let getState = sinon.stub();
        let firestore = {
            collection: sinon.stub().returnsThis(),
            delete: sinon.stub().resolves(true),
            doc: sinon.stub().returnsThis(),
        };
        let getFirestore = () => firestore;

        const userId = 'xxy';
        const logId = 'alog';
        const id = 'tto';
        const date = '2020-01-01';

        await deleteEntry({userId, logId, id, date})(dispatch, getState, {getFirestore});

        expect(dispatch.called).toBeTruthy();
        expect(getState.called).toBeFalsy();
        expect(firestore.collection.withArgs('usersv1').calledOnce).toBeTruthy();
        expect(firestore.collection.withArgs('entries').calledOnce).toBeTruthy();
        expect(firestore.delete.called).toBeTruthy();
        expect(firestore.doc.withArgs(userId).calledOnce).toBeTruthy();
        expect(firestore.doc.withArgs(id).calledOnce).toBeTruthy();
    })
});
