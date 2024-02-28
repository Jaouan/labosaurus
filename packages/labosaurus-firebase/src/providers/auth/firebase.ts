import { GoogleAuthProvider, getAuth, signInWithPopup, signOut, Auth, User } from 'firebase/auth';
import { doc, getDoc, getFirestore, Firestore } from 'firebase/firestore';
import { FirebaseApp } from 'firebase/app';
import { AuthProvider, LabUser } from '@labosaurus/core';

export const firebaseAuthProvider = (firebaseApp: FirebaseApp): AuthProvider => {
  const auth: Auth = getAuth(firebaseApp);
  const googleProvider = new GoogleAuthProvider();

  const logout = async (afterAction: (user: User | null) => void = () => {}) =>
    signOut(auth).then(() => afterAction(null));

  const login = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };

  const getUser = () =>
    auth.currentUser
      ? {
          email: auth.currentUser?.email,
          avatar: auth.currentUser?.photoURL,
          name: auth.currentUser?.displayName
        }
      : null;

  const isAdmin = async () => {
    const db: Firestore = getFirestore(firebaseApp);
    const userDoc = await getDoc(doc(db, 'users', auth.currentUser?.email || ''));
    return !!userDoc.data()?.admin;
  };

  const onUser = (callback: (user?: LabUser | null) => void): (() => void) =>
    auth.onAuthStateChanged(() => {
      callback(getUser());
    });

  return {
    login,
    logout,
    getUser,
    isAdmin,
    onUser
  };
};
