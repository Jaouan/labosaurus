import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

import LabosaurusRoot from '../../lib/components/LabosaurusRoot';
import firebaseAuthProvider from '../../lib/providers/auth/firebase';
import firebaseStoreProvider from '../../lib/providers/store/firestore';

import * as firebase from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import firebaseConfig from "../firebase-config.json";

export const app = firebase.initializeApp(firebaseConfig);
ExecutionEnvironment.canUseDOM && getAnalytics(app);

export default function Root({ children }) {
    return <LabosaurusRoot config={{
        authProvider: firebaseAuthProvider(app),
        storeProvider: firebaseStoreProvider(app)
    }}>{children}</LabosaurusRoot>;
}