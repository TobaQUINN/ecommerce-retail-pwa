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
      {
        path: '/:department',
        lazy: () => import('@/pages/Department'),
      },
      {
        path: '/product/:slug',
        lazy: () => import('@/pages/Product'),
      },
      {
        path: '/cart',
        lazy: () => import('@/pages/Cart'),
      },
      {
        path: '/checkout',
        lazy: () => import('@/pages/Checkout'),
      },
      {
        path: '/order/:orderId',
        lazy: () => import('@/pages/OrderStatus'),
      },
      {
        path: '/track-order',
        lazy: () => import('@/pages/TrackOrder'),
      },
      {
        path: '/contact',
        lazy: () => import('@/pages/Contact'),
      },
      {
        path: '*',
        lazy: () => import('@/pages/NotFound'),
      },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        lazy: () => import('@/pages/admin/Dashboard'),
      },
      {
        path: 'products',
        lazy: () => import('@/pages/admin/Products'),
      },
      {
        path: 'orders',
        lazy: () => import('@/pages/admin/Orders'),
      },
      {
        path: 'categories',
        lazy: () => import('@/pages/admin/Categories'),
      },
      {
        path: 'customers',
        lazy: () => import('@/pages/admin/Customers'),
      },
    ],
  },
])
