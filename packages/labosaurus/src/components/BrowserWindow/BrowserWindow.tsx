/**
 * https://github.com/facebook/docusaurus/tree/main/website/src/components/BrowserWindow
 * 
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { type CSSProperties, type ReactNode } from 'react';
import clsx from 'clsx';

import './BrowserWindow.css';

interface Props {
  children: ReactNode;
  className?: string;
  minHeight?: number;
  url: string;
  style?: CSSProperties;
  bodyStyle?: CSSProperties;
}

export const BrowserWindow = ({
  children,
  className,
  minHeight,
  url = 'http://localhost:3000',
  style,
  bodyStyle
}: Props): JSX.Element => {
  return (
    <div className={clsx("browserWindow", className)} style={{ ...style, minHeight }}>
      <div className="browserWindowHeader">
        <div className="buttons">
          <span className="dot" style={{ background: '#f25f58' }} />
          <span className="dot" style={{ background: '#fbbe3c' }} />
          <span className="dot" style={{ background: '#58cb42' }} />
        </div>
        <div
          className={clsx('browserWindowAddressBar', 'text--truncate')}
          dangerouslySetInnerHTML={{ __html: url }}
        ></div>
        <div className="browserWindowMenuIcon">
          <div>
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
          </div>
        </div>
      </div>

      <div className="browserWindowBody" style={bodyStyle}>
        {children}
      </div>
    </div>
  );
};
