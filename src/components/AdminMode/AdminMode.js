import { useEffect, useState, useCallback } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import clsx from 'clsx';


export default function AdminMode({ children, userEmail }) {
    const [slideMode, setSlideMode] = useState(false);
    const [admin, setAdmin] = useState(false);

    const toggleSlideMode = () => {
        slideMode ? sessionStorage.removeItem("slide") : sessionStorage.setItem("slide", true);
        setSlideMode(!slideMode);
    };
    const checkKeyPress = useCallback((e) => e.key === "∑" && toggleSlideMode(), [slideMode]);

    const checkIsAdmin = async (email) =>
        !!((await getDoc(doc(db, "users", email)))?.data()?.admin);

    useEffect(() => {
        setSlideMode(!!sessionStorage.getItem("slide"));
        document.addEventListener("keypress", checkKeyPress);
        return () => document.removeEventListener("keypress", checkKeyPress);
    }, [checkKeyPress]);

    useEffect(() => {
        (async () => setAdmin(await checkIsAdmin(userEmail)))();
    }, []);

    return <div className={clsx({ "admin": admin, "slide": slideMode })}>{children}</div>;
}