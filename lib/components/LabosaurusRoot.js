import React, { useState } from 'react';
import AdminMode from './AdminMode/AdminMode';
import GoogleLogin from './Login/GoogleLogin';
import { LabosaurusContext } from "..";

export default function LabosaurusRoot({ children, config }) {
    const [user, setUser] = useState(null);
    const [verifyingAuthentication, setVerifyingAuthentication] = useState(true);

    const isAuthenticated = () => user?.email;

    config.authProvider.onUser((callbackUser) => {
        user !== callbackUser && setUser(callbackUser);
        verifyingAuthentication && setVerifyingAuthentication(false);
    });

    if (verifyingAuthentication) return <></>;
    if (isAuthenticated()) return (
        <LabosaurusContext.Provider value={config}>
            <AdminMode config={config}>{children}</AdminMode>
        </LabosaurusContext.Provider>
    );
    return <GoogleLogin config={config} />;
}