import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui'
import { AnimateIn } from '@/components/ui/AnimateIn'

interface CategoryShowcase {
  name: string
  department: string
  products: string[]
}

const categories: CategoryShowcase[] = [
  {
    name: 'Phone Accessories',
    department: 'electronics',
    products: ['Chargers', 'USB Cables & Charging Cords', 'Power Banks', 'Memory Cards', 'Flash Drives'],
  },
  {
    name: 'Audio & Sound',
    department: 'electronics',
    products: ['Wired Earphones', 'Wireless Earbuds', 'Bluetooth Speakers', 'Headphones', 'MP3 Players'],
  },
  {
    name: 'Electronics',
    department: 'electronics',
    products: ['Game Consoles', 'PS2–PS4 Controllers', 'Wired & Wireless Controllers', 'HDMI Cables', 'AV Cables'],
  },
  {
    name: 'Smart Devices',
    department: 'electronics',
    products: ['Smart Watches'],
  },
  {
    name: 'Electrical Gadgets',
    department: 'electronics',
    products: ['LED Bulbs', 'Extension Boxes', 'Portable Fans', 'Rechargeable Lamps', 'Sockets & Switches', 'Torches'],
  },
  {
    name: 'Fashion',
    department: 'fashion',
    products: ['Jewellery', 'Wristwatches', 'Rings', 'Bracelets', 'Chains', 'Earrings', 'Anklets', 'Fashion Caps'],
  },
  {
    name: 'Lifestyle',
    department: 'fashion',
    products: ["Men's Underwear", "Women's Underwear", 'Nightwear', 'Pyjamas'],
  },
]

export function CategoriesSection() {
  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <Container>
        <AnimateIn className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Popular Categories
          </h2>
          <p className="text-gray-600 text-lg max-w-lg mx-auto">
            A glimpse at what we carry — browse any category to see the full collection
          </p>
        </AnimateIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {categories.map((category, index) => (
            <AnimateIn key={category.name} delay={index * 0.06}>
              <Link
                to={`/${category.department}?category=${encodeURIComponent(category.name)}`}
                className="group flex flex-col h-full bg-white rounded-xl border border-gray-100 p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-300"
              >
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">
                  {category.name}
                </h3>

                <div className="flex-1 mb-4">
                  <div className="flex flex-wrap gap-1.5">
                    {category.products.map((product) => (
                      <span
                        key={product}
                        className="inline-block text-xs sm:text-sm text-gray-600 bg-gray-50 border border-gray-100 rounded-md px-2.5 py-1"
                      >
                        {product}
                      </span>
                    ))}
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 group-hover:text-accent transition-colors">
                  View Category
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </AnimateIn>
          ))}
        </div>
      </Container>
    </section>
  )
}
