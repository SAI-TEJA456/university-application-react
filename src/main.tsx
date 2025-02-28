import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom";

//where combines all files and App component
createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
    <App />
      </BrowserRouter>
  </StrictMode>,
)
