import clsx from 'clsx';
import { ReactNode, SyntheticEvent } from 'react';

import './BlurFlow.css';

interface BlurFlowProps {
  children: ReactNode;
}

interface BlurFlowStepProps {
  children: ReactNode;
  unblurred: boolean;
}

export const BlurFlow: React.FC<BlurFlowProps> = ({ children }) => <div className="blur-flow">{children}</div>;
export const BlurFlowStep: React.FC<BlurFlowStepProps> = ({ children, unblurred }) => (
  <div
    className={clsx({
      'blur-flow-step': true,
      'blur-flow-step--blurred': !unblurred
    })}
  >
    {children}
  </div>
);

export const unblurNextStep = (elementFromCurrentBlurStep: SyntheticEvent<any, any> | Element) => {
  const targetElement =
    ((elementFromCurrentBlurStep as SyntheticEvent<Element, any>)?.target as Element) || elementFromCurrentBlurStep;
  const currentBlurStep = targetElement.closest('.blur-flow-step');
  const currentBlurFlow = targetElement.closest('.blur-flow');
  const nextBlur = currentBlurFlow?.getElementsByClassName('blur-flow-step--blurred')?.[0];
  if (
    currentBlurFlow &&
    currentBlurStep &&
    nextBlur &&
    !currentBlurStep?.classList.contains('blur-flow-step--masked')
  ) {
    nextBlur?.classList.remove('blur-flow-step--blurred');
    currentBlurStep.classList.add('blur-flow-step--masked');
  }
};
