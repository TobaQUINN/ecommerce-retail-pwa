import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button, Container } from '@/components/ui'

export function HeroSection() {
  return (
    <section className="relative bg-gray-900 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_50%,_rgba(184,134,11,0.3),_transparent_70%)]" />

      <Container className="relative py-16 sm:py-24 lg:py-32">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-accent font-medium text-sm uppercase tracking-wider mb-4"
          >
            Quality Products, Honest Prices
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
          >
            Your Trusted Store for{' '}
            <span className="text-accent">Electronics</span> &{' '}
            <span className="text-accent">Fashion</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-gray-300 text-lg sm:text-xl leading-relaxed mb-8 max-w-lg"
          >
            Browse quality gadgets and fashion accessories. Shop online or visit
            our store in Ijoko, Ogun State.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link to="/electronics">
              <Button size="lg" className="bg-accent text-black hover:bg-accent-light">
                Shop Electronics
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </Link>
            <Link to="/fashion">
              <Button size="lg" variant="secondary" className="border-gray-600 text-white hover:bg-gray-800">
                Explore Fashion
              </Button>
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
