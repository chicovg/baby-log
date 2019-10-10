import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAKC-8jmwF8GbovrWXDyeOu7PQTf45SxyI",
    authDomain: "baby-log-255211.firebaseapp.com",
    databaseURL: "https://baby-log-255211.firebaseio.com",
    projectId: "baby-log-255211",
    storageBucket: "baby-log-255211.appspot.com",
    messagingSenderId: "773291577572",
    appId: "1:773291577572:web:7a63fef5cd3fda98e0dcf1"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const provider = new firebase.auth.GoogleAuthProvider();

export const listenToAuth = (onAuthChanged) => {
    firebase.auth().onAuthStateChanged(onAuthChanged);
};

export const signIn = (onSuccess, onError) => {
    firebase.auth().signInWithPopup(provider)
        .then(onSuccess)
        .catch(onError);
};

const db = firebase.firestore();

export const getLogEntries = (userId, receiveEntries, receiveError) => {
    db.collection('entries')
        .where('userId', '==', 'wbGq0kdqlpWqNT74WccmPZLQB7l1')
        .get()
        .then(snapshot => {
            let entries = [];

            snapshot.forEach(doc => entries.push({
                id: doc.id,
                ...doc.data(),
            }));

            receiveEntries(entries);
        })
        .catch(error => console.log(error));
};
