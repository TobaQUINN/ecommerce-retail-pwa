import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { Container } from '@/components/ui'
import {
  BUSINESS_NAME,
  BUSINESS_ADDRESS,
  BUSINESS_PHONE,
  BUSINESS_EMAIL,
  STORE_HOURS,
} from '@/constants'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 border-b border-gray-700">
          <div>
            <h3 className="text-white font-semibold text-lg mb-3">
              {BUSINESS_NAME}
            </h3>
            <p className="text-sm leading-relaxed">
              Quality electronics and fashion products. Visit our store in Ijoko,
              Ogun State or shop online.
            </p>
          </div>

          <div>
            <h4 className="text-white font-medium text-sm mb-3 uppercase tracking-wider">
              Shop
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/electronics" className="text-sm hover:text-white transition-colors">
                  Electronics & Gadgets
                </Link>
              </li>
              <li>
                <Link to="/fashion" className="text-sm hover:text-white transition-colors">
                  Fashion & Lifestyle
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium text-sm mb-3 uppercase tracking-wider">
              Help
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/track-order" className="text-sm hover:text-white transition-colors">
                  Track Order
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium text-sm mb-3 uppercase tracking-wider">
              Visit Us
            </h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                <span>{BUSINESS_ADDRESS}</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <Phone size={16} className="mt-0.5 shrink-0" />
                <span className="space-y-0.5">
                  {BUSINESS_PHONE.map((phone) => (
                    <a key={phone} href={`tel:${phone}`} className="block hover:text-white transition-colors">
                      {phone}
                    </a>
                  ))}
                </span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Mail size={16} className="shrink-0" />
                <a href={`mailto:${BUSINESS_EMAIL}`} className="hover:text-white transition-colors">
                  {BUSINESS_EMAIL}
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Clock size={16} className="shrink-0" />
                <span>{STORE_HOURS}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 text-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} {BUSINESS_NAME}. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  )
}
