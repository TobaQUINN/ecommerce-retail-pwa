import { Link } from 'react-router-dom'
import { Container } from '@/components/ui'
import { AnimateIn } from '@/components/ui/AnimateIn'
import { categories } from './data'

export function CategoriesSection() {
  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <Container>
        <AnimateIn className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Popular Categories
          </h2>
          <p className="text-gray-600 text-lg max-w-md mx-auto">
            Browse our most popular product categories
          </p>
        </AnimateIn>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((category, index) => (
            <AnimateIn key={category.id} delay={index * 0.08}>
              <Link
                to={`/${category.department}`}
                className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="aspect-[3/2] overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-3 sm:p-4">
                  <h3 className="font-medium text-gray-900 text-sm sm:text-base">
                    {category.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                    {category.productCount} products
                  </p>
                </div>
              </Link>
            </AnimateIn>
          ))}
        </div>
      </Container>
    </section>
  )
}
