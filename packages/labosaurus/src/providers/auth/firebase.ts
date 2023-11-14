import { GoogleAuthProvider, getAuth, signInWithPopup, signOut, Auth, User } from 'firebase/auth';
import { doc, getDoc, getFirestore, Firestore } from 'firebase/firestore';
import { FirebaseApp } from 'firebase/app';
import { AuthProvider } from './auth-provider.interface';

export const firebaseAuthProvider = (firebaseApp: FirebaseApp): AuthProvider => {
  const auth: Auth = getAuth(firebaseApp);
  const googleProvider = new GoogleAuthProvider();

  const logout = async (afterAction: (user: User | null) => void = () => {}) =>
    signOut(auth).then(() => afterAction(null));

  const login = async (): Promise<void> => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };

  const getUser = (): string | undefined | null => auth.currentUser?.email;

  const isAdmin = async (): Promise<boolean> => {
    const db: Firestore = getFirestore(firebaseApp);
    const userDoc = await getDoc(doc(db, 'users', auth.currentUser?.email || ''));
    return !!userDoc.data()?.admin;
  };

  const onUser = (callback: (user: string | undefined | null) => void): (() => void) =>
    auth.onAuthStateChanged(firebaseUser => {
      callback(firebaseUser?.email);
    });

  return {
    login,
    logout,
    getUser,
    isAdmin,
    onUser
  };
};
