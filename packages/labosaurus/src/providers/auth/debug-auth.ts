import { AuthProvider } from './auth-provider.interface';

export const debugAuthProvider = (): AuthProvider => {
  const authSubscribers: ((user: string | undefined | null) => void)[] = [];

  const getUser = () => sessionStorage.getItem('user');

  const updateUser = (user: string | undefined) => {
    console.debug(`session: ${getUser()} -> ${user}`);
    user ? sessionStorage.setItem('user', user) : sessionStorage.removeItem('user');
    authSubscribers.forEach((callback: (user: string | undefined | null) => void) => callback(user));
  };

  const logout = async () => updateUser(undefined);

  const login = async () => updateUser('dummy');

  const isAdmin = async (): Promise<boolean> => !!getUser();

  const onUser = (callback: (user: string | undefined | null) => void): (() => void) => {
    authSubscribers.push(callback);
    callback(getUser());
    return () => {
      authSubscribers.filter(aCallback => aCallback !== callback);
    };
  };

  return {
    login,
    logout,
    getUser,
    isAdmin,
    onUser
  };
};
