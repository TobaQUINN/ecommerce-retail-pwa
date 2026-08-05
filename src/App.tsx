import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Analytics } from '@vercel/analytics/react'
import { ErrorBoundary } from '@/components/common/ErrorBoundary'
import { router } from '@/routes'
import { onAuthChange } from '@/services/auth'
import { useUserStore } from '@/store/user'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
})

function App() {
  const setUser = useUserStore((s) => s.setUser)

  useEffect(() => {
    return onAuthChange(setUser)
  }, [setUser])

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Analytics />
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

export default App
