import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from '@/pages/main'
import { DropDownControllerPage } from '@/pages/dropdown-controller';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DropDownControllerPage/>
    {/* <App /> */}
  </StrictMode>,
);
