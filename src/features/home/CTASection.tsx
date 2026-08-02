import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Button, Container } from '@/components/ui'
import { AnimateIn } from '@/components/ui/AnimateIn'

export function CTASection() {
  return (
    <section className="py-16 sm:py-20 bg-gray-900">
      <Container>
        <AnimateIn>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Shop?
            </h2>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Browse our collection of quality products. Shop from anywhere and
              get it delivered, or visit our store in Ijoko.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/electronics">
                <Button size="lg" className="bg-accent text-black hover:bg-accent-light">
                  Start Shopping
                  <ArrowRight size={18} className="ml-2" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="secondary" className="border-gray-600 text-white hover:bg-gray-800">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </AnimateIn>
      </Container>
    </section>
  )
}
