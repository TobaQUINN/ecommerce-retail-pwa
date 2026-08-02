import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui'
import { AnimateIn } from '@/components/ui/AnimateIn'

interface RelatedProduct {
  id: string
  slug: string
  name: string
  price: number
  image: string
  badge?: string
}

interface RelatedProductsProps {
  products: RelatedProduct[]
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(price)
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) return null

  return (
    <section className="py-8 border-t border-gray-100">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">
        You May Also Like
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {products.map((product, index) => (
          <AnimateIn key={product.id} delay={index * 0.08}>
            <Link
              to={`/product/${product.slug}`}
              className="group block bg-white rounded-lg overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-300"
            >
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {product.badge && (
                  <div className="absolute top-2 left-2">
                    <Badge variant={product.badge === 'New Arrival' ? 'info' : 'neutral'}>
                      {product.badge}
                    </Badge>
                  </div>
                )}
              </div>
              <div className="p-3">
                <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                  {product.name}
                </h3>
                <span className="text-sm font-bold text-gray-900">
                  {formatPrice(product.price)}
                </span>
              </div>
            </Link>
          </AnimateIn>
        ))}
      </div>
    </section>
  )
}
