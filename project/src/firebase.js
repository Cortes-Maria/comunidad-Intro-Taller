import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";

var firebaseConfig = {
    apiKey: "AIzaSyAFDDiDY-SCpCsfn9Ute1MFDnLt24xypQY",
    authDomain: "comunidad-intro-taller-5d2f8.firebaseapp.com",
    projectId: "comunidad-intro-taller-5d2f8",
    storageBucket: "comunidad-intro-taller-5d2f8.appspot.com",
    messagingSenderId: "1011337811420",
    appId: "1:1011337811420:web:b3ccc916af4e3d5558eb19",
    measurementId: "G-9M4DXDE1P6"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const db = firebase.database();
const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => {
auth.signInWithPopup(provider);
};

export const generateUserDocument = async (user, additionalData) => {
    if (!user) return;
    const userRef = firestore.doc(`users/${user.uid}`);
    const snapshot = await userRef.get();
    if (!snapshot.exists) {
        const { email, displayName, photoURL } = user;
        try {
        await userRef.set({
            displayName,
            email,
            photoURL,
            ...additionalData
        });
        } catch (error) {
        console.error("Error creating user document", error);
        }
}
return getUserDocument(user.uid);
};

const getUserDocument = async uid => {
    if (!uid) return null;
    try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    return {
        uid,
        ...userDocument.data()
    };
    } catch (error) {
    console.error("Error fetching user", error);
    }
};