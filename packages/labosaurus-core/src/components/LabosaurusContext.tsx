import React from 'react';
import { LabosaurusConfig } from '../labosaurus.interface';

export const LabosaurusContext = React.createContext<LabosaurusConfig>({} as LabosaurusConfig);
