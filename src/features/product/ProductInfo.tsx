import { useState } from 'react'
import { ShoppingCart, Zap } from 'lucide-react'
import { Badge, Button } from '@/components/ui'
import { useCartStore } from '@/store/cart'
import { QuantitySelector } from './QuantitySelector'
import type { ProductDetail } from './data'

interface ProductInfoProps {
  product: ProductDetail
}

function getAvailabilityVariant(availability: string) {
  switch (availability) {
    case 'In Stock':
      return 'success' as const
    case 'Limited Stock':
      return 'warning' as const
    case 'Out of Stock':
      return 'error' as const
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

export function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1)
  const addItem = useCartStore((s) => s.addItem)
  const isOutOfStock = product.availability === 'Out of Stock'

  function handleAddToCart() {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.images[0],
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant={getAvailabilityVariant(product.availability)}>
            {product.availability}
          </Badge>
          {product.badge && (
            <Badge variant={product.badge === 'New Arrival' ? 'info' : 'neutral'}>
              {product.badge}
            </Badge>
          )}
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          {product.name}
        </h1>
        <p className="text-sm text-gray-500">
          {product.category} · {product.department === 'electronics' ? 'Electronics' : 'Fashion'}
        </p>
      </div>

      <div>
        <span className="text-3xl font-bold text-gray-900">
          {formatPrice(product.price)}
        </span>
      </div>

      <p className="text-gray-600 leading-relaxed">
        {product.description}
      </p>

      {product.highlights.length > 0 && (
        <div className="border-t border-b border-gray-100 py-4">
          <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">
            Specifications
          </h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
            {product.highlights.map((h) => (
              <div key={h.label} className="flex justify-between sm:justify-start sm:gap-3 py-1">
                <dt className="text-sm text-gray-500">{h.label}</dt>
                <dd className="text-sm font-medium text-gray-900">{h.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {!isOutOfStock && (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Quantity</span>
            <QuantitySelector value={quantity} onChange={setQuantity} />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              size="lg"
              fullWidth
              onClick={handleAddToCart}
              className="gap-2"
            >
              <ShoppingCart size={18} />
              Add to Cart
            </Button>
            <Button
              size="lg"
              fullWidth
              onClick={handleAddToCart}
              className="gap-2 bg-accent text-black hover:bg-accent-light"
            >
              <Zap size={18} />
              Buy Now
            </Button>
          </div>
        </div>
      )}

      {isOutOfStock && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-600">
            This product is currently out of stock. Please check back later or contact us for availability.
          </p>
        </div>
      )}
    </div>
  )
}
