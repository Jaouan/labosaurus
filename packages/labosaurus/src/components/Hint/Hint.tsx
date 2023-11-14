import React, { ReactNode } from 'react';
import './Hint.css';

interface HintProps {
  children: ReactNode;
}

export const Hint: React.FC<HintProps> = ({ children }) => (
  <div className="hint-container">
    <span className="hint-icon">💡</span>
    <span className="hint">{children}</span>
  </div>
);
