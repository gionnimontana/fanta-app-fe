import React from 'react'
import ReactDOM from 'react-dom/client'
import NotificationComponent from './components/generalUI/notifications/NotificationComponent';
import { RouterProvider } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "react-query";
import { router } from './routes'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <NotificationComponent/>
    </QueryClientProvider>
  </React.StrictMode>,
)
