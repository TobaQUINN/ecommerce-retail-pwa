import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Container, Button } from '@/components/ui'
import { AnimateIn } from '@/components/ui/AnimateIn'
import { ProductCard } from './ProductCard'
import { featuredProducts } from './data'

export function FeaturedProducts() {
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
          {featuredProducts.map((product, index) => (
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
