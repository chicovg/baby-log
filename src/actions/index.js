import {home, goTo, viewEntriesForDate} from '../utils/locations';

export const goToHome = () => goTo(home.link());

export const goToEntriesForDate = (logId, date) => () => goTo(viewEntriesForDate.link(logId, date));

export const loginToFirebase = (dispatch, getState, {getFirebase}) =>
    getFirebase().login({
        provider: 'google',
        type: 'redirect',
    });

export const saveNewLog = ({userId, log}) => (
    dispatch,
    getState,
    {getFirestore},
) =>
    getFirestore()
        .collection('users')
        .doc(userId)
        .collection('logs')
        .add(log)
        .then(() => dispatch(goToHome));

export const saveUpdatedLog = ({userId, logId, log}) => (
    dispatch,
    getState,
    {getFirestore}
) =>
    getFirestore()
        .collection('users')
        .doc(userId)
        .collection('logs')
        .doc(logId)
        .set(log)
        .then(() => dispatch(goToHome));

export const deleteLog = ({userId, logId}) => (
    dispatch,
    getState,
    {getFirestore}
) =>
    getFirestore()
        .collection('users')
        .doc(userId)
        .collection('logs')
        .doc(logId)
        .delete()
        .then(() => dispatch(goToHome));

export const saveNewEntry = ({userId, logId, entry}) => (
    dispatch,
    getState,
    {getFirestore},
) =>
    getFirestore()
        .collection('users')
        .doc(userId)
        .collection('entries')
        .add({...entry})
        .then(() => dispatch(goToEntriesForDate(logId, entry.date)));

export const saveUpdatedEntry = ({userId, logId, id, entry}) => (
    dispatch,
    getState,
    {getFirestore},
) =>
    getFirestore()
        .collection('users')
        .doc(userId)
        .collection('entries')
        .doc(id)
        .set(entry)
        .then(() => dispatch(goToEntriesForDate(logId, entry.date)));

export const deleteEntry = ({userId, logId, id, date}) => (
    dispatch,
    getState,
    {getFirestore},
) =>
    getFirestore()
        .collection('users')
        .doc(userId)
        .collection('entries')
        .doc(id)
        .delete()
        .then(() => dispatch(goToEntriesForDate(logId, date)));
