import React, { useContext } from 'react';
import { LabosaurusConfig } from '../../labosaurus.interface';
import { LabosaurusContext } from '../LabosaurusContext';
import './GoogleLogin.css';

export const GoogleLogin: React.FC = () => {
  const { authProvider } = useContext<LabosaurusConfig>(LabosaurusContext);
  return (
    <div className="login-container">
      <button onClick={authProvider.login} type="button" className="login-google-btn">
        Sign in with Google
      </button>
    </div>
  );
};
