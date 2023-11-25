import { useContext, useEffect, useState, ReactNode } from 'react';
import { LabosaurusContext } from '../LabosaurusContext';
import { LabosaurusConfig } from '../../labosaurus.interface';
import { AuthProvider } from '../../providers/auth/auth-provider.interface';

interface AnyOnlyProps {
  children: ReactNode;
}

const anyOnlyFactory =
  (asyncPredicate: (authProvider: AuthProvider) => Promise<boolean>): React.FC<AnyOnlyProps> =>
  ({ children }) => {
    const { authProvider } = useContext<LabosaurusConfig>(LabosaurusContext);
    const [canBeShown, setCanBeShown] = useState<boolean>(false);

    useEffect(() => {
      (async () => setCanBeShown(await asyncPredicate(authProvider)))();
    }, []);

    return canBeShown ? <>{children}</> : <></>;
  };

export const AdminOnly = anyOnlyFactory(async authProvider => !!(await authProvider.isAdmin()));
export const UserOnly = anyOnlyFactory(
  async authProvider => !!authProvider.getUser() && !(await authProvider.isAdmin())
);
