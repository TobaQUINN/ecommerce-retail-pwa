import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, ShoppingCart, Search, User, LogOut, Package } from 'lucide-react'
import { Container } from '@/components/ui'
import { useCartStore } from '@/store/cart'
import { useUserStore } from '@/store/user'
import { signInWithGoogle, signOutUser } from '@/services/auth'
import { BUSINESS_NAME } from '@/constants'

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const totalItems = useCartStore((state) => state.totalItems)
  const user = useUserStore((s) => s.user)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <Container>
        <nav className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="text-xl font-bold text-gray-900 tracking-tight"
          >
            {BUSINESS_NAME}
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/electronics"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Electronics
            </Link>
            <Link
              to="/fashion"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Fashion
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            <Link
              to="/cart"
              className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
              aria-label={`Shopping cart, ${totalItems()} items`}
            >
              <ShoppingCart size={20} />
              {totalItems() > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-accent rounded-full">
                  {totalItems()}
                </span>
              )}
            </Link>

            {/* User Menu */}
            <div className="relative" ref={userMenuRef}>
              {user ? (
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="p-1 rounded-full border-2 border-gray-200 hover:border-gray-400 transition-colors"
                  aria-label="Account menu"
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt=""
                      className="w-7 h-7 rounded-full"
                    />
                  ) : (
                    <User size={18} className="text-gray-600 m-0.5" />
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => signInWithGoogle()}
                  className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                  aria-label="Sign in"
                >
                  <User size={20} />
                </button>
              )}

              {isUserMenuOpen && user && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg border border-gray-200 shadow-lg py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {user.displayName}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user.email}
                    </p>
                  </div>
                  <Link
                    to="/orders"
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <Package size={16} />
                    My Orders
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      signOutUser()
                      setIsUserMenuOpen(false)
                    }}
                    className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              )}
            </div>

            <button
              type="button"
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col gap-3">
              <Link
                to="/"
                className="text-base font-medium text-gray-600 hover:text-gray-900 px-2 py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/electronics"
                className="text-base font-medium text-gray-600 hover:text-gray-900 px-2 py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Electronics
              </Link>
              <Link
                to="/fashion"
                className="text-base font-medium text-gray-600 hover:text-gray-900 px-2 py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Fashion
              </Link>
              {user && (
                <Link
                  to="/orders"
                  className="text-base font-medium text-gray-600 hover:text-gray-900 px-2 py-1"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  My Orders
                </Link>
              )}
            </div>
          </div>
        )}
      </Container>
    </header>
  )
}
