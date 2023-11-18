import { GoogleLogin, LabosaurusRoot, debugAuthProvider, debugInMemoryStoreProvider, firebaseAuthProvider, firebaseStoreProvider } from '@jaouan/labosaurus';

import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import * as firebase from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import firebaseConfig from '../../firebase-config.json';
import { getAuthType } from './enable-auth';

export const app = firebase.initializeApp(firebaseConfig);
ExecutionEnvironment.canUseDOM && getAnalytics(app);

const configByAuthStrategies = {
  "none": () => ({
    storeProvider: debugInMemoryStoreProvider(),
  }),
  "mock": () => ({
    authProvider: debugAuthProvider(),
    storeProvider: debugInMemoryStoreProvider(),
    loginComponent: () => (
      <>
        <GoogleLogin />
        <div className="mock">(authentication is mocked)</div>
      </>
    )
  }),
  "google": () => ({
    authProvider: firebaseAuthProvider(),
    storeProvider: firebaseStoreProvider(),
  })
};


const configByAuthStrategy = (configByAuthStrategies[getAuthType()] ?? configByAuthStrategies["none"])();

export default function Root({ children }) {
  return (
    <LabosaurusRoot config={configByAuthStrategy}>
      {children}
    </LabosaurusRoot>
  );
}
