import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { TooltipProvider } from './components/ui/Tooltip';
import '@material/web/all.js';
import '@material/web/tokens/md-sys-color.css';
import '@material/web/tokens/md-sys-elevation.css';
import '@material/web/tokens/md-sys-motion.css';
import '@material/web/tokens/md-sys-shape.css';
import '@material/web/tokens/md-sys-state.css';
import '@material/web/tokens/md-sys-typescale.css';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TooltipProvider>
      <App />
    </TooltipProvider>
  </StrictMode>
);
