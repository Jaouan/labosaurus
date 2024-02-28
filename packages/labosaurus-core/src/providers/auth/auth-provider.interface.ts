export interface LabUser {
  email?: string | null;
  avatar?: string | null;
  name?: string | null;
}

export interface AuthProvider {
  login: () => Promise<void>;
  logout: () => Promise<void>;
  getUser: () => LabUser | undefined | null;
  isAdmin: () => Promise<boolean>;
  onUser: (callback: (user?: LabUser | null) => void) => () => void;
}
