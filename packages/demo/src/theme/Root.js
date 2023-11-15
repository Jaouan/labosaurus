import { GoogleLogin, LabosaurusRoot, debugAuthProvider, debugInMemoryStoreProvider, firebaseAuthProvider, firebaseStoreProvider } from '@jaouan/labosaurus';

import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import * as firebase from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import firebaseConfig from '../../firebase-config.json';

export const app = firebase.initializeApp(firebaseConfig);

if (ExecutionEnvironment.canUseDOM) {
  getAnalytics(app);
  sessionStorage.setItem("mockAuth", !!window.location.search?.includes("mockAuth"));
}
const isAuthMocked = () => ExecutionEnvironment.canUseDOM && sessionStorage?.getItem("mockAuth") === "true";

export default function Root({ children }) {
  return (
    <LabosaurusRoot
      config={isAuthMocked() ? {
        authProvider: debugAuthProvider(),
        storeProvider: debugInMemoryStoreProvider(),
        loginComponent: () => (
          <>
            <GoogleLogin />
            <div className="mock">(authentication is mocked)</div>
          </>
        )
      } : {
        authProvider: firebaseAuthProvider(app),
        storeProvider: debugInMemoryStoreProvider(),
        loginComponent: () => <GoogleLogin />
      }}
    >
      {children}
    </LabosaurusRoot>
  );
}
