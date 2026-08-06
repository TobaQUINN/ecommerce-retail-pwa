import { Shield, Truck, Star, HeadphonesIcon } from 'lucide-react'
import { Container } from '@/components/ui'
import { AnimateIn } from '@/components/ui/AnimateIn'

const features = [
  {
    icon: Shield,
    title: 'Verified Products',
    description:
      'Every product is genuine. What you see is exactly what you get — no surprises.',
  },
  {
    icon: Truck,
    title: 'Delivery & Pickup',
    description:
      'Get products delivered to your doorstep or visit our store in Ijoko to collect.',
  },
  {
    icon: Star,
    title: 'Quality Guaranteed',
    description:
      'We stock only quality products from trusted brands at honest prices.',
  },
  {
    icon: HeadphonesIcon,
    title: 'Customer Support',
    description:
      'Questions about a product? Reach out anytime — we respond quickly.',
  },
]

export function WhyChooseUs() {
  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <Container>
        <AnimateIn className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Why Choose Us
          </h2>
          <p className="text-gray-600 text-lg max-w-md mx-auto">
            We prioritize your trust over everything else
          </p>
        </AnimateIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <AnimateIn key={feature.title} delay={index * 0.1}>
              <div className="text-center p-6 bg-white rounded-lg">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-900/10 mb-4">
                  <feature.icon size={24} className="text-blue-900" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </Container>
    </section>
  )
}
