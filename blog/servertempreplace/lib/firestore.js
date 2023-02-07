import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    deleteDoc,
    doc,
    query,
    where,
    setDoc,
    collectionGroup,
    Timestamp,
} from "firebase/firestore"
import { getDB } from "./firebase"

export const queryByCollection = async (col) => {
    const colRef = collection(getDB(), col)

    const snapshot = await getDocs(colRef)

    const docs = Array.from(snapshot.docs).map((doc) => {
        return {
            ...doc.data(),
            id: doc.id,
        }
    })

    return docs
};

export const queryForDoc = async (col, id) => {
    const colRef = doc(getDB(), col, id)
    const snapshot = await getDoc(colRef)
    return snapshot.data()

}

export const set = async (col, document) => {
    await setDoc(doc(collection(getDB(), col)), document, { merge: true })
}

export const add = async (col, document) => {
    const colRef = collection(getDB(), col)

    const docRef = await addDoc(colRef, document)

    return docRef
};

export const del = async (col, id) => {
    const docRef = doc(getDB(), col, id)
    return await deleteDoc(docRef)
}
