import { AuthProvider } from './auth-provider.interface';

export const noAuthProvider = (anonymousIsAdmin = false): AuthProvider => {
  const getUser = () => 'anonymous';

  const logout = async () => {};

  const login = async () => {};

  const isAdmin = async () => anonymousIsAdmin;

  const onUser = (callback: (user: string | undefined | null) => void): (() => void) => {
    callback(getUser());
    return () => {};
  };

  return {
    login,
    logout,
    getUser,
    isAdmin,
    onUser
  };
};
