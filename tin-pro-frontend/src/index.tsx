import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './app/router/Router'
import ReactDOM from 'react-dom/client'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}>

    </RouterProvider>
  </React.StrictMode >,
)
