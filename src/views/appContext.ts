import { createContext } from 'react';
export interface appProps {
  message: string;
}
const appContext = createContext<appProps>({ message: '' });
export default appContext;
