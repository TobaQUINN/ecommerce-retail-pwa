import { useEffect, useState } from 'react'
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Package,
  Users,
  Menu,
  X,
  LogOut,
} from 'lucide-react'
import { useUserStore } from '@/store/user'
import { isUserAdmin } from '@/services/admin-auth'
import { signInWithGoogle, signOutUser } from '@/services/auth'
import { Spinner } from '@/components/ui/Spinner'
import { Button } from '@/components/ui/Button'
import { BUSINESS_NAME } from '@/constants'

const navItems = [
  { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { label: 'Orders', path: '/admin/orders', icon: Package },
  { label: 'Customers', path: '/admin/customers', icon: Users },
]

export function AdminLayout() {
  const user = useUserStore((s) => s.user)
  const isAuthLoading = useUserStore((s) => s.isLoading)
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    if (!user) {
      setIsAdmin(null)
      return
    }
    isUserAdmin(user)
      .then(setIsAdmin)
      .catch((err) => {
        console.error('Admin check failed:', err)
        setIsAdmin(false)
      })
  }, [user])

  if (isAuthLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white rounded-lg border border-gray-200 p-8 max-w-sm w-full text-center">
          <h1 className="text-xl font-bold text-gray-900 mb-2">Admin Access</h1>
          <p className="text-sm text-gray-600 mb-6">
            Sign in with your administrator account to continue.
          </p>
          <Button fullWidth onClick={() => signInWithGoogle()}>
            Sign in with Google
          </Button>
        </div>
      </div>
    )
  }

  if (isAdmin === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    )
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200
          transform transition-transform duration-200 ease-in-out
          lg:translate-x-0 lg:static lg:z-auto
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Brand */}
          <div className="flex items-center justify-between h-16 px-5 border-b border-gray-200">
            <Link to="/admin" className="text-lg font-bold text-gray-900 truncate">
              {BUSINESS_NAME}
            </Link>
            <button
              type="button"
              className="lg:hidden p-1 text-gray-500 hover:text-gray-700"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={20} />
            </button>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-3 py-4 space-y-1">
            {navItems.map((item) => {
              const isActive =
                item.path === '/admin'
                  ? location.pathname === '/admin'
                  : location.pathname.startsWith(item.path)
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors
                    ${isActive
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-700 hover:bg-gray-100'}
                  `}
                >
                  <item.icon size={18} />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* User */}
          <div className="px-4 py-4 border-t border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              {user.photoURL && (
                <img src={user.photoURL} alt="" className="w-8 h-8 rounded-full" />
              )}
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user.displayName}
                </p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => signOutUser()}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <LogOut size={16} />
              Sign out
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex items-center h-16 px-4 sm:px-6 bg-white border-b border-gray-200 lg:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-gray-600 hover:text-gray-900"
            aria-label="Open sidebar"
          >
            <Menu size={20} />
          </button>
          <span className="ml-3 text-lg font-bold text-gray-900">
            {BUSINESS_NAME}
          </span>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
