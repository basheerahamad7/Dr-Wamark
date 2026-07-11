import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { inject } from '@vercel/analytics';
import { SpeedInsights } from '@vercel/speed-insights/react';
import App from './App.tsx';
import './index.css';

// Initialize Vercel Analytics tracking
inject();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <SpeedInsights />
  </StrictMode>,
);
