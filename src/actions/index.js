import {goTo, viewEntriesForDate} from '../utils/locations';

export const goToEntriesForDate = (logId, date) => () =>
    goTo(viewEntriesForDate.link(logId, date));

export const saveNewEntry = ({logId, userId, entry}) => (
    dispatch,
    getState,
    {getFirestore}
) =>
    getFirestore()
        .collection('users')
        .doc(userId)
        .collection('entries')
        .add({...entry})
        .then(() => dispatch(goToEntriesForDate(logId, entry.date)));

export const saveUpdatedEntry = ({logId, userId, id, entry}) => (
    dispatch,
    getState,
    {getFirestore}
) =>
    getFirestore()
        .collection('users')
        .doc(userId)
        .collection('entries')
        .doc(id)
        .set(entry)
        .then(() => dispatch(goToEntriesForDate(logId, entry.date)));
