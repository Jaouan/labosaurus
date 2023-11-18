import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import { noAuthProvider } from '@jaouan/labosaurus';

export const getAuthType = () => {
    if (!ExecutionEnvironment.canUseDOM) return noAuthProvider;
    if (sessionStorage.getItem("authType")) return sessionStorage.getItem("authType");

    const searchParams = new URLSearchParams(window.location.search);
    const authType = searchParams.get('auth');
    sessionStorage.setItem("authType", authType);
    
    return authType;
}
