import { Search, ShoppingCart, ClipboardCheck, CreditCard } from 'lucide-react'
import { Container } from '@/components/ui'
import { AnimateIn } from '@/components/ui/AnimateIn'

const steps = [
  {
    icon: Search,
    step: '01',
    title: 'Browse Products',
    description: 'Explore our electronics and fashion collections online.',
  },
  {
    icon: ShoppingCart,
    step: '02',
    title: 'Add to Cart',
    description: 'Select your items and submit an order request.',
  },
  {
    icon: ClipboardCheck,
    step: '03',
    title: 'We Verify',
    description: 'We confirm availability, calculate delivery and approve your order.',
  },
  {
    icon: CreditCard,
    step: '04',
    title: 'Pay & Receive',
    description: 'Make payment after verification. Collect in-store or get delivery.',
  },
]

export function ShoppingProcess() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <Container>
        <AnimateIn className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            How It Works
          </h2>
          <p className="text-gray-600 text-lg max-w-lg mx-auto">
            A simple, transparent process designed to protect you
          </p>
        </AnimateIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <AnimateIn key={step.step} delay={index * 0.1}>
              <div className="relative text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gray-900 mb-4">
                  <step.icon size={24} className="text-white" />
                </div>
                <p className="text-xs font-bold text-accent uppercase tracking-wider mb-1">
                  Step {step.step}
                </p>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </Container>
    </section>
  )
}
