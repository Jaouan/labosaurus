import { doc, setDoc, onSnapshot, getDoc, getFirestore, Firestore } from 'firebase/firestore';
import { FirebaseApp } from 'firebase/app';
import { DocumentReference, StoreProvider } from '@labosaurus/core';

export const firebaseStoreProvider = (firebaseApp: FirebaseApp): StoreProvider => {
  const db: Firestore = getFirestore(firebaseApp);

  const get = async (document: string, id: string): Promise<unknown | undefined> =>
    (await getDoc(doc(db, document, id))).data();

  const dispatch = ({ document, id }: DocumentReference, data: unknown): Promise<void> =>
    setDoc(doc(db, document, id), data);

  const subscribe = (
    { document, id }: DocumentReference,
    callback: (data: unknown | undefined) => void = () => {}
  ): (() => void) => onSnapshot(doc(db, document, id), element => callback(element.data()));

  return {
    get,
    dispatch,
    subscribe
  };
};
