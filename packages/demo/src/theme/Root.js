import { GoogleLogin, LabosaurusRoot, firebaseAuthProvider, firebaseStoreProvider } from '@jaouan/labosaurus';

import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import * as firebase from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import firebaseConfig from '../../firebase-config.json';

export const app = firebase.initializeApp(firebaseConfig);
ExecutionEnvironment.canUseDOM && getAnalytics(app);

export default function Root({ children }) {
  return (
    <LabosaurusRoot
      config={{
        authProvider: firebaseAuthProvider(app),
        storeProvider: firebaseStoreProvider(app),
        loginComponent: () => <GoogleLogin />
      }}
    >
      {children}
    </LabosaurusRoot>
  );
}
