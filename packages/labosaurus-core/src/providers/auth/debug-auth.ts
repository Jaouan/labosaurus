import { AuthProvider, LabUser } from './auth-provider.interface';

export const debugAuthProvider = (): AuthProvider => {
  const authSubscribers: ((user?: LabUser) => void)[] = [];

  const getUser = (): LabUser => ({
    email: `${sessionStorage.getItem('user')}@labosaurus.com`,
    name: sessionStorage.getItem('user')
  });

  const updateUser = (userName: string | undefined) => {
    console.debug(`session: ${getUser()} -> ${userName}`);
    userName ? sessionStorage.setItem('user', userName) : sessionStorage.removeItem('user');
    const user = getUser();
    authSubscribers.forEach((callback: (user?: LabUser) => void) => callback(user));
  };

  const logout = async () => updateUser(undefined);

  const login = async () => updateUser('dummy');

  const isAdmin = async () => !!getUser();

  const onUser = (callback: (user?: LabUser) => void): (() => void) => {
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
