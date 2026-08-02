import { MapPin, Clock, Phone } from 'lucide-react'
import { Container } from '@/components/ui'
import { AnimateIn } from '@/components/ui/AnimateIn'

export function StoreInfo() {
  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <AnimateIn direction="left">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Visit Our Store
              </h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Prefer to see products in person? Visit our physical store. Our
                team is ready to help you find exactly what you need.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <MapPin size={20} className="text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Location</p>
                    <p className="text-gray-600 text-sm">
                      Ijoko, Ogun State, Nigeria
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <Clock size={20} className="text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Store Hours</p>
                    <p className="text-gray-600 text-sm">
                      Monday – Saturday: 8:00 AM – 8:00 PM
                    </p>
                    <p className="text-gray-600 text-sm">
                      Sunday: 10:00 AM – 5:00 PM
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <Phone size={20} className="text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Contact</p>
                    <p className="text-gray-600 text-sm">
                      Visit the store or reach us online
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimateIn>

          <AnimateIn direction="right" delay={0.1}>
            <div className="relative rounded-lg overflow-hidden h-64 sm:h-80 lg:h-96 bg-gray-200">
              <img
                src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=600&h=400&fit=crop"
                alt="Our retail store"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </AnimateIn>
        </div>
      </Container>
    </section>
  )
}
