import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "normalize.css";
import "@/assets/style/index.css"
// import App from './App.tsx'
import { RouterProvider } from 'react-router-dom';
import Router from './router.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <App /> */}
    <RouterProvider router={Router}></RouterProvider>
  </StrictMode>,
)
