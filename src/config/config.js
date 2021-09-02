import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyBbjg9FzUO-jOC4TzCSkmFjkYOdj4ILnlc",
    authDomain: "the-recipe-281912.firebaseapp.com",
    databaseURL: "https://the-recipe-281912.firebaseio.com",
    projectId: "the-recipe-281912",
    storageBucket: "the-recipe-281912.appspot.com",
    messagingSenderId: "446129426639",
    appId: "1:446129426639:web:7baa67ea3e0d5dd4aa67ba",
    measurementId: "G-97E3RFQ0MQ"
}

firebase.initializeApp(config)

export const fbase = firebase
export const database = firebase.database()
export const auth = firebase.auth()
export const storage = firebase.storage()