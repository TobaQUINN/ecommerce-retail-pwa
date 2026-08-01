import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, ShoppingCart, Search } from 'lucide-react'
import { Container } from '@/components/ui'
import { useCartStore } from '@/store/cart'
import { BUSINESS_NAME } from '@/constants'

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const totalItems = useCartStore((state) => state.totalItems)

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
            </div>
          </div>
        )}
      </Container>
    </header>
  )
}
