import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
//import {isUserAuthenticated} from "../redux/user/user-sagas";

const config = {
    apiKey: "AIzaSyAKIvHPDLM6wv6lUwnH1r5NOLWMInKGbaw",
    authDomain: "addisclothing-db.firebaseapp.com",
    databaseURL: "https://addisclothing-db.firebaseio.com",
    projectId: "addisclothing-db",
    storageBucket: "",
    messagingSenderId: "800134568217",
    appId: "1:800134568217:web:ed6521307a8bf45f"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    if (!snapShot.exists) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log("error creating user ", error.message);
        }
    }
    return userRef;
};

firebase.initializeApp(config);

export const addcollectionAndDocuments = async (collectionKey, ObjectToAdd) => {
  const collectionRef = firestore.collection(collectionKey);
  const batch = firestore.batch();
  ObjectToAdd.forEach(Obj => {
     const newDocRef = collectionRef.doc();
     batch.set(newDocRef, Obj);
  });

  return await batch.commit();

};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
      const {title, items} = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  });

  return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {})
};

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            resolve(userAuth);
        }, reject)
    })
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
      googleProvider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
