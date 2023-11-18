import React, { useState, ReactNode } from 'react';
import { AdminMode } from './AdminMode/AdminMode';
import { GoogleLogin } from './Login/GoogleLogin';
import { LabosaurusConfig } from '../labosaurus.interface';
import { debugInMemoryStoreProvider } from '../providers/store/debug-in-memory';
import { LabosaurusContext } from './LabosaurusContext';

import './labosaurus.global.css';
import { noAuthProvider } from '../providers/auth/no-auth';

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
    authProvider: config.authProvider ?? noAuthProvider(),
    loginComponent: config.loginComponent ?? (() => <GoogleLogin />)
  };

  safeConfig.authProvider.onUser(callbackUser => {
    user !== callbackUser && setUser(callbackUser);
    verifyingAuthentication && setVerifyingAuthentication(false);
  });

  if (verifyingAuthentication) return <></>;
  return (
    <LabosaurusContext.Provider value={safeConfig}>
      {isAuthenticated() ? <AdminMode>{children}</AdminMode> : safeConfig.loginComponent()}
    </LabosaurusContext.Provider>
  );
};
