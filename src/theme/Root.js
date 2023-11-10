import React, { useState } from 'react';
import { auth } from '../firebase/firebase';
import Login from '../components/Login/Login';
import AdminMode from '../components/AdminMode/AdminMode';

export default function Root({ children }) {
    const [user, setUser] = useState(null);
    const [verifyingAuthentication, setVerifyingAuthentication] = useState(true);

    const isAuthenticated = () => user?.email;

    auth.onAuthStateChanged((userAuth) => {
        user !== userAuth && setUser(userAuth);
        verifyingAuthentication && setVerifyingAuthentication(false);
    });

    if (verifyingAuthentication) return <></>;
    if (isAuthenticated()) return <AdminMode userEmail={user.email}>{children}</AdminMode>;
    return <Login />;
}