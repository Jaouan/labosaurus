import { useEffect, useState, useCallback, ReactNode, useContext } from 'react';
import clsx from 'clsx';
import { LabosaurusConfig } from '../../labosaurus.interface';
import { LabosaurusContext } from '../LabosaurusContext';

import './AdminMode.css';

interface AdminModeProps {
  children: ReactNode;
}

export const AdminMode: React.FC<AdminModeProps> = ({ children }) => {
  const { authProvider } = useContext<LabosaurusConfig>(LabosaurusContext);

  const [slideMode, setSlideMode] = useState<boolean>(false);
  const [admin, setAdmin] = useState<boolean>(false);

  const toggleSlideMode = () => {
    slideMode ? sessionStorage.removeItem('slide') : sessionStorage.setItem('slide', 'true');
    setSlideMode(!slideMode);
  };

  const checkKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === '∑') {
        toggleSlideMode();
      }
    },
    [slideMode]
  );

  useEffect(() => {
    setSlideMode(!!sessionStorage.getItem('slide'));
    document.addEventListener('keypress', checkKeyPress);
    return () => {
      document.removeEventListener('keypress', checkKeyPress);
    };
  }, [checkKeyPress]);

  useEffect(() => {
    (async () => setAdmin(await authProvider.isAdmin()))();
  }, [authProvider]);

  return <div className={clsx({ admin: admin, slide: slideMode })}>{children}</div>;
};
