import { doc, setDoc, onSnapshot, getDoc, getFirestore } from "firebase/firestore";

const firebaseStoreProvider = (firebaseApp) => {
    const db = getFirestore(firebaseApp);

    const get = async (document, id) =>
        (await getDoc(doc(db, document, id)))?.data();

    const dispatch = ({ document, id }, data) =>
        setDoc(doc(db, document, id), data);

    const subscribe = ({ document, id }, callback = () => { }) =>
        onSnapshot(doc(db, document, id), (element) => callback(element?.data()));

    return {
        get,
        dispatch,
        subscribe,
    };
};

export default firebaseStoreProvider;
