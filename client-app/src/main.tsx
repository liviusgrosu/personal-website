import React from 'react'
import ReactDOM from 'react-dom/client'
import './App.css'
import "semantic-ui-css/semantic.min.css";
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router/Routes.tsx';
import { StoreContext, store } from './app/stores/store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreContext.Provider value={store}>
      <RouterProvider router={router} />
    </StoreContext.Provider>
  </React.StrictMode>,
)
