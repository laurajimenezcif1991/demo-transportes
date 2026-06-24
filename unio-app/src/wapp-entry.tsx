import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import WaApplyFlow from './pages/WaApplyFlow';

createRoot(document.getElementById('wapp-root')!).render(
  <StrictMode>
    <WaApplyFlow />
  </StrictMode>
);
