import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './app/router/Router'
import ReactDOM from 'react-dom/client'
import { store } from './app/store/store'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>

      </RouterProvider>
    </Provider>
  </React.StrictMode >,
)
