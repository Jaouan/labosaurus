import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from 'firebase/auth';
import { doc, getDoc, getFirestore } from "firebase/firestore";

const firebaseAuthProvider = (firebaseApp) => {
    const db = getFirestore(firebaseApp);
    const auth = getAuth(firebaseApp);
    const googleProvider = new GoogleAuthProvider();

    const logout = (afterAction = () => { }) =>
        signOut(auth).then(_ => afterAction(null));

    const login = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (err) {
            console.error(err);
        }
    }

    const getUser = () => auth.currentUser?.email;

    const isAdmin = async () =>
        !!((await getDoc(doc(db, "users", auth.currentUser?.email)))?.data()?.admin)

    const onUser = (callback) =>
        auth.onAuthStateChanged(callback);

    return {
        login,
        logout,
        getUser,
        isAdmin,
        onUser
    };
};

export default firebaseAuthProvider;
