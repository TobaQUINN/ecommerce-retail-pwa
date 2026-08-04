import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { Container } from '@/components/ui'
import {
  BUSINESS_NAME,
  BUSINESS_ADDRESS,
  BUSINESS_PHONE,
  BUSINESS_EMAIL,
  STORE_HOURS,
  CUSTOMER_SERVICE_HOURS,
} from '@/constants'

function Contact() {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Contact Us
          </h1>
          <p className="text-gray-600 mb-10">
            Reach out to {BUSINESS_NAME} — we're happy to help.
          </p>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <MapPin size={20} className="text-accent" />
              </div>
              <div>
                <p className="font-medium text-gray-900 mb-1">Address</p>
                <p className="text-gray-600">{BUSINESS_ADDRESS}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <Phone size={20} className="text-accent" />
              </div>
              <div>
                <p className="font-medium text-gray-900 mb-1">Phone</p>
                {BUSINESS_PHONE.map((phone) => (
                  <p key={phone}>
                    <a
                      href={`tel:${phone}`}
                      className="text-gray-600 hover:text-accent transition-colors"
                    >
                      {phone}
                    </a>
                  </p>
                ))}
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <Mail size={20} className="text-accent" />
              </div>
              <div>
                <p className="font-medium text-gray-900 mb-1">Email</p>
                <a
                  href={`mailto:${BUSINESS_EMAIL}`}
                  className="text-gray-600 hover:text-accent transition-colors"
                >
                  {BUSINESS_EMAIL}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <Clock size={20} className="text-accent" />
              </div>
              <div>
                <p className="font-medium text-gray-900 mb-1">Hours</p>
                <p className="text-gray-600">Store: {STORE_HOURS}</p>
                <p className="text-gray-600">Customer Service: {CUSTOMER_SERVICE_HOURS}</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export const Component = Contact
