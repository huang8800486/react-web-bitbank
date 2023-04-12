import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './assets/styles/index.styl';
import { setupRem } from '/@/utils/plugin';
setupRem();
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);
