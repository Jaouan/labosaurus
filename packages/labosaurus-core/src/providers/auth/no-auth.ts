import { AuthProvider, LabUser } from './auth-provider.interface';

export const noAuthProvider = (anonymousIsAdmin = false): AuthProvider => {
  const getUser = () => ({ email: 'anonymous@labosaurus.com', name: 'anonymous' });

  const logout = async () => {};

  const login = async () => {};

  const isAdmin = async () => anonymousIsAdmin;

  const onUser = (callback: (user?: LabUser) => void): (() => void) => {
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
