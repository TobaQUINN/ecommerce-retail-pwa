import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Loader2 } from 'lucide-react'
import { Container, Button } from '@/components/ui'
import { AnimateIn } from '@/components/ui/AnimateIn'
import { ProductCard } from './ProductCard'
import { getFeaturedProducts } from '@/services/products'
import type { ProductDocument } from '@/services/products'

export function FeaturedProducts() {
  const [products, setProducts] = useState<ProductDocument[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getFeaturedProducts()
      .then(setProducts)
      .catch(() => setProducts([]))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <section className="py-16 sm:py-20 bg-white">
        <Container>
          <div className="flex justify-center py-12">
            <Loader2 className="animate-spin text-gray-400" size={32} />
          </div>
        </Container>
      </section>
    )
  }

  if (products.length === 0) return null

  const mapped = products.map((p) => ({
    id: p.slug,
    name: p.name,
    price: p.price,
    image: p.images[0] ?? '',
    department: p.department,
    availability: p.availability,
    badge: p.badge,
  }))

  return (
    <section className="py-16 sm:py-20 bg-white">
      <Container>
        <AnimateIn className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Featured Products
            </h2>
            <p className="text-gray-600 text-lg">
              Our most popular picks, handpicked for you
            </p>
          </div>
          <Link to="/electronics" className="hidden sm:block">
            <Button variant="ghost" size="sm">
              View All
              <ArrowRight size={16} className="ml-1" />
            </Button>
          </Link>
        </AnimateIn>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {mapped.map((product, index) => (
            <AnimateIn key={product.id} delay={index * 0.08}>
              <ProductCard product={product} />
            </AnimateIn>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link to="/electronics">
            <Button variant="secondary">
              View All Products
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  )
}
