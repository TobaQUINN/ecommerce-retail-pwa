import { Link } from 'react-router-dom'
import { Smartphone, Shirt, ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui'
import { AnimateIn } from '@/components/ui/AnimateIn'

const departments = [
  {
    name: 'Electronics & Gadgets',
    description:
      'Chargers, earbuds, speakers, smart watches, gaming accessories and more.',
    icon: Smartphone,
    href: '/electronics',
    image: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=600&h=400&fit=crop',
  },
  {
    name: 'Fashion & Lifestyle',
    description:
      'Clothing, shoes, jewelry, perfumes, accessories and more.',
    icon: Shirt,
    href: '/fashion',
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=600&h=400&fit=crop',
  },
]

export function DepartmentSection() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <Container>
        <AnimateIn className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Shop by Department
          </h2>
          <p className="text-gray-600 text-lg max-w-md mx-auto">
            Find exactly what you need across our two departments
          </p>
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {departments.map((dept, index) => (
            <AnimateIn key={dept.name} delay={index * 0.1}>
              <Link
                to={dept.href}
                className="group relative block overflow-hidden rounded-lg h-64 sm:h-72"
              >
                <img
                  src={dept.image}
                  alt={dept.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <dept.icon size={24} className="text-accent" />
                    <h3 className="text-xl font-semibold text-white">
                      {dept.name}
                    </h3>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">
                    {dept.description}
                  </p>
                  <span className="inline-flex items-center text-accent text-sm font-medium group-hover:gap-2 transition-all">
                    Browse Products
                    <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </AnimateIn>
          ))}
        </div>
      </Container>
    </section>
  )
}
