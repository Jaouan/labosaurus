import { useContext, useEffect, useState, ReactNode } from 'react';
import { LabosaurusContext } from '../LabosaurusContext';
import { LabosaurusConfig } from '../../labosaurus.interface';

import './Hidden.css';

interface HiddenProps {
  until: number;
  label?: string;
  group?: string;
  children: ReactNode;
}

export const Hidden: React.FC<HiddenProps> = ({
  until,
  label = 'Hidden block.',
  group = 'default',
  children
}: HiddenProps) => {
  const { storeProvider } = useContext<LabosaurusConfig>(LabosaurusContext);

  const [canBeShown, setCanBeShown] = useState<boolean>(false);

  const updateUntil = (newUntil: number) =>
    storeProvider.dispatch({ document: 'hidden', id: group }, { until: newUntil });
  const hideBlock = () => updateUntil(until - 1);
  const showBlock = () => updateUntil(until);

  useEffect(() => {
    const unsubscribe = storeProvider.subscribe({ document: 'hidden', id: group }, (doc: any) => {
      try {
        const shouldBeShown = doc?.until >= until;
        if (shouldBeShown !== canBeShown) {
          setCanBeShown(shouldBeShown);
        }
      } catch (err) {
        console.error(err);
      }
    });
    return () => unsubscribe();
  }, [canBeShown, storeProvider, group, until]);

  return canBeShown ? (
    <>
      <span className="hidden-block--btn hidden-block--btn-hide" onClick={hideBlock}>
        🙈
      </span>
      {children}
    </>
  ) : (
    <>
      <span className="hidden-block--btn" onClick={showBlock}>
        🙌
      </span>
      <div className="block hidden-block">{label}</div>
    </>
  );
};
