export interface AuthProvider {
  login: () => Promise<void>;
  logout: () => Promise<void>;
  getUser: () => string | undefined | null;
  isAdmin: () => Promise<boolean>;
  onUser: (callback: (user: string | undefined | null) => void) => () => void;
}
