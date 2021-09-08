import { createContext } from 'react';

export interface ChartType {
  title: string;
  query: string;
  type: string;
  artist: any;
}

export const ChartContext = createContext({
  title: '',
  query: '',
  type: '',
  artist: {},
} as ChartType);
