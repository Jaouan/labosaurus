import React, { useState, ReactNode } from 'react';
import { AdminMode } from './AdminMode/AdminMode';
import { GoogleLogin } from './Login/GoogleLogin';
import { LabosaurusConfig } from '../labosaurus.interface';
import { debugInMemoryStoreProvider } from '../providers/store/debug-in-memory';
import { debugAuthProvider } from '../providers/auth/debug-auth';
import { LabosaurusContext } from './LabosaurusContext';

import './labosaurus.global.css';

interface LabosaurusRootProps {
  children: ReactNode;
  config: LabosaurusConfig;
}

export const LabosaurusRoot: React.FC<LabosaurusRootProps> = ({ children, config }) => {
  const [user, setUser] = useState<any | null>(null);
  const [verifyingAuthentication, setVerifyingAuthentication] = useState<boolean>(true);

  const isAuthenticated = () => user;

  const safeConfig: LabosaurusConfig = {
    storeProvider: config.storeProvider ?? debugInMemoryStoreProvider(),
    authProvider: config.authProvider ?? debugAuthProvider(),
    loginComponent: config.loginComponent ?? (() => <GoogleLogin />)
  };

  safeConfig.authProvider.onUser(callbackUser => {
    user !== callbackUser && setUser(callbackUser);
    verifyingAuthentication && setVerifyingAuthentication(false);
  });

  if (verifyingAuthentication) return <></>;
  return (
    <LabosaurusContext.Provider value={config}>
      {isAuthenticated() ? <AdminMode config={config}>{children}</AdminMode> : safeConfig.loginComponent()}
    </LabosaurusContext.Provider>
  );
};
