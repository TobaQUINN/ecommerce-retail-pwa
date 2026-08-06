import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button, Container } from '@/components/ui'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <img
        src="/hero-background.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/65" />

      <Container className="relative py-20 sm:py-28 lg:py-36">
        <div className="max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-yellow-400 leading-tight mb-6"
          >
            Your Trusted Store for Electronics & Fashion
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white text-lg sm:text-xl leading-relaxed mb-8 max-w-lg"
          >
            Browse quality gadgets and fashion accessories. Shop online or visit
            our store in Ijoko, Ogun State.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link to="/electronics">
              <Button size="lg" className="border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400/10">
                Shop Electronics
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </Link>
            <Link to="/fashion">
              <Button size="lg" className="border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400/10">
                Explore Fashion
              </Button>
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
