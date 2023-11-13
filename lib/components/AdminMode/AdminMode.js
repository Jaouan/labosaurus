import { useEffect, useState, useCallback } from 'react';
import clsx from 'clsx';

export default function AdminMode({ children, config: { authProvider } }) {
    const [slideMode, setSlideMode] = useState(false);
    const [admin, setAdmin] = useState(false);

    const toggleSlideMode = () => {
        slideMode ? sessionStorage.removeItem("slide") : sessionStorage.setItem("slide", true);
        setSlideMode(!slideMode);
    };
    const checkKeyPress = useCallback((e) => e.key === "∑" && toggleSlideMode(), [slideMode]);

    useEffect(() => {
        setSlideMode(!!sessionStorage.getItem("slide"));
        document.addEventListener("keypress", checkKeyPress);
        return () => document.removeEventListener("keypress", checkKeyPress);
    }, [checkKeyPress]);

    useEffect(() => {
        (async () => setAdmin(await authProvider.isAdmin()))();
    }, []);

    return <div className={clsx({ "admin": admin, "slide": slideMode })}>{children}</div>;
}