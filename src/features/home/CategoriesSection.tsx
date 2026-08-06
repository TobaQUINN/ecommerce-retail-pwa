import { Link } from 'react-router-dom'
import { Gem, Shirt } from 'lucide-react'
import { Container } from '@/components/ui'
import { AnimateIn } from '@/components/ui/AnimateIn'
import type { LucideIcon } from 'lucide-react'

interface Category {
  name: string
  department: string
  image?: string
  icon?: LucideIcon
}

const categories: Category[] = [
  {
    name: 'Phone Accessories',
    department: 'electronics',
    image: '/categories/phone-accessories.png',
  },
  {
    name: 'Audio & Sound',
    department: 'electronics',
    image: '/categories/audio-sound.png',
  },
  {
    name: 'Electronics',
    department: 'electronics',
    image: '/categories/electronics-category.png',
  },
  {
    name: 'Smart Devices',
    department: 'electronics',
    image: '/categories/smart-devices.png',
  },
  {
    name: 'Electrical Gadgets',
    department: 'electronics',
    image: '/categories/electrical-gadget.png',
  },
  {
    name: 'Fashion',
    department: 'fashion',
    icon: Gem,
  },
  {
    name: 'Lifestyle',
    department: 'fashion',
    icon: Shirt,
  },
]

export function CategoriesSection() {
  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <Container>
        <AnimateIn className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Popular Categories
          </h2>
          <p className="text-gray-600 text-lg max-w-lg mx-auto">
            Browse any category to see the full collection
          </p>
        </AnimateIn>

        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 lg:grid-cols-4 sm:overflow-visible sm:pb-0">
          {categories.map((category, index) => (
            <AnimateIn key={category.name} delay={index * 0.05}>
              <Link
                to={`/${category.department}?category=${encodeURIComponent(category.name)}`}
                className="group flex-shrink-0 snap-start w-44 sm:w-auto flex flex-col items-center bg-gray-900 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full"
              >
                {category.image ? (
                  <div className="w-full h-28 sm:h-32 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="w-full h-28 sm:h-32 flex items-center justify-center bg-gray-800">
                    {category.icon && (
                      <category.icon size={40} className="text-accent/70 group-hover:text-accent transition-colors" />
                    )}
                  </div>
                )}
                <h3 className="text-sm sm:text-base font-semibold text-white text-center leading-tight px-4 py-3">
                  {category.name}
                </h3>
              </Link>
            </AnimateIn>
          ))}
        </div>
      </Container>
    </section>
  )
}
