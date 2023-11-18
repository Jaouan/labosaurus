import { AuthProvider } from './providers/auth/auth-provider.interface';
import { StoreProvider } from './providers/store/store-provider.interface';

export interface LabosaurusConfig {
  authProvider: AuthProvider;
  storeProvider: StoreProvider;
  loginElement: () => JSX.Element;
}
