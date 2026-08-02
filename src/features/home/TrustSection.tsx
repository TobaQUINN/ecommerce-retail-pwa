import { CheckCircle } from 'lucide-react'
import { Container } from '@/components/ui'
import { AnimateIn } from '@/components/ui/AnimateIn'

const promises = [
  'No payment before order verification',
  'Authentic products only — what you see is what you get',
  'Honest pricing with no hidden charges',
  'Real product images, never stock photos',
  'Transparent order tracking from start to finish',
  'In-store inspection before purchase welcome',
]

export function TrustSection() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <AnimateIn>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Our Promise to You
            </h2>
            <p className="text-gray-600 text-lg mb-10 max-w-lg mx-auto">
              We value your trust more than making a quick sale. Here&apos;s what
              we guarantee:
            </p>
          </AnimateIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            {promises.map((promise, index) => (
              <AnimateIn key={promise} delay={index * 0.08}>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50">
                  <CheckCircle size={20} className="text-success shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {promise}
                  </p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
