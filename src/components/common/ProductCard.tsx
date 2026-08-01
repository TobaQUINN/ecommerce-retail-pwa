import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { Badge } from '@/components/ui'
import type { Availability, Department } from '@/types'

export interface ProductCardData {
  id: string
  name: string
  slug: string
  price: number
  image: string
  department: Department
  availability: Availability
  badge?: string
  category?: string
}

function getAvailabilityVariant(availability: Availability) {
  switch (availability) {
    case 'In Stock':
      return 'success' as const
    case 'Limited Stock':
      return 'warning' as const
    case 'Out of Stock':
      return 'error' as const
  }
}

function getBadgeVariant(badge: string) {
  switch (badge) {
    case 'New Arrival':
      return 'info' as const
    case 'Sale':
      return 'warning' as const
    default:
      return 'neutral' as const
  }
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(price)
}

interface ProductCardProps {
  product: ProductCardData
}

export function ProductCard({ product }: ProductCardProps) {
  const isOutOfStock = product.availability === 'Out of Stock'

  return (
    <Link
      to={`/product/${product.slug}`}
      className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
      aria-label={`${product.name} — ${formatPrice(product.price)}`}
    >
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt=""
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${isOutOfStock ? 'opacity-60' : ''}`}
          loading="lazy"
        />
        {product.badge && (
          <div className="absolute top-2 left-2">
            <Badge variant={getBadgeVariant(product.badge)}>
              {product.badge}
            </Badge>
          </div>
        )}
        <div className="absolute top-2 right-2">
          <Badge variant={getAvailabilityVariant(product.availability)}>
            {product.availability}
          </Badge>
        </div>
      </div>

      <div className="p-3 sm:p-4">
        {product.category && (
          <p className="text-xs text-gray-500 mb-1">{product.category}</p>
        )}
        <h3 className="font-medium text-gray-900 text-sm sm:text-base line-clamp-2 mb-2">
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          {!isOutOfStock && (
            <span
              className="p-2 rounded-full bg-gray-100 text-gray-600 group-hover:bg-accent group-hover:text-black transition-colors"
              aria-hidden="true"
            >
              <ShoppingCart size={16} />
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
