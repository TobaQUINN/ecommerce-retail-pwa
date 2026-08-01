import { createBrowserRouter } from 'react-router-dom'
import { CustomerLayout } from '@/layouts/CustomerLayout'
import { AdminLayout } from '@/layouts/AdminLayout'

export const router = createBrowserRouter([
  {
    element: <CustomerLayout />,
    children: [
      {
        path: '/',
        lazy: () => import('@/pages/Home'),
      },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [],
  },
])
