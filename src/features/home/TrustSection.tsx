import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Container } from '@/components/ui'
import { AnimateIn } from '@/components/ui/AnimateIn'

const faqs = [
  {
    question: 'When do I pay?',
    answer:
      'You only pay after we verify your order. We confirm product availability, calculate delivery cost, and send you payment instructions. No upfront payment is required.',
  },
  {
    question: 'How is my order verified?',
    answer:
      'After you submit an order request, we check product availability, confirm the quantity, assess delivery feasibility, and calculate the total including delivery. You receive a confirmation before any payment is needed.',
  },
  {
    question: 'Do you deliver to Lagos?',
    answer:
      'Yes, we deliver within Ogun State and Lagos. Delivery cost is calculated during order verification based on your location.',
  },
  {
    question: 'Can I buy directly from the store?',
    answer:
      'Absolutely. You can browse products online, check availability, then visit our store in Ijoko to inspect and purchase in person.',
  },
  {
    question: 'What happens if a product is unavailable?',
    answer:
      "If a product is out of stock after you place an order, we'll let you know during verification. You won't be charged for unavailable items.",
  },
]

export function TrustSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-16 sm:py-20 bg-white">
      <Container>
        <div className="max-w-2xl mx-auto">
          <AnimateIn className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 text-lg">
              Common questions about how we work
            </p>
          </AnimateIn>

          <div className="divide-y divide-gray-200">
            {faqs.map((faq, index) => (
              <AnimateIn key={faq.question} delay={index * 0.05}>
                <div>
                  <button
                    type="button"
                    onClick={() =>
                      setOpenIndex(openIndex === index ? null : index)
                    }
                    className="w-full flex items-center justify-between py-5 text-left"
                  >
                    <span className="font-medium text-gray-900 pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown
                      size={20}
                      className={`shrink-0 text-gray-500 transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-200 ${openIndex === index ? 'max-h-40 pb-5' : 'max-h-0'}`}
                  >
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
