import { ShieldCheck, Truck, HeadphonesIcon, CheckCircle } from 'lucide-react'

const badges = [
  { icon: CheckCircle, label: 'Quality Products' },
  { icon: Truck, label: 'Fast Delivery' },
  { icon: ShieldCheck, label: 'Secure Payment' },
  { icon: HeadphonesIcon, label: 'Customer Support' },
]

export function TrustBadges() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-6 border-t border-gray-100">
      {badges.map(({ icon: Icon, label }) => (
        <div key={label} className="flex items-center gap-2 text-gray-600">
          <Icon size={16} className="text-accent shrink-0" />
          <span className="text-xs sm:text-sm">{label}</span>
        </div>
      ))}
    </div>
  )
}
