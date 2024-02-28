import { GoogleLogin, LabosaurusRoot, debugAuthProvider, debugInMemoryStoreProvider } from '@labosaurus/core';
import { firebaseAuthProvider, firebaseStoreProvider } from '@labosaurus/firebase';

import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import * as firebase from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import firebaseConfig from '../../firebase-config.json';
import { getAuthType } from './enable-auth';
import { useEffect } from 'react';

export const app = firebase.initializeApp(firebaseConfig);
ExecutionEnvironment.canUseDOM && getAnalytics(app);

const configByAuthStrategies = {
  "none": () => ({
    storeProvider: debugInMemoryStoreProvider(),
  }),
  "mock": () => ({
    authProvider: debugAuthProvider(),
    storeProvider: debugInMemoryStoreProvider(),
    loginElement: () => (
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
  // DISABLE SSG FOR THIS EXAMPLE ONLY.
  // SSG will hydrate blog with no auth, so it might break CSR auth.
  if (!ExecutionEnvironment.canUseDOM) return <></>;

  useEffect(() =>
    configByAuthStrategy.authProvider.onUser((user) =>
      document.documentElement.style.setProperty('--user-avatar', user.avatar)
    ),
    []
  );

  return (
    <LabosaurusRoot config={configByAuthStrategy}>
      {children}
    </LabosaurusRoot>
  );
}
