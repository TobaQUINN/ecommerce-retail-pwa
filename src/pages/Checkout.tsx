import { useState, type FormEvent } from 'react'
import { useLocation, useNavigate, Navigate } from 'react-router-dom'
import { Container } from '@/components/ui/Container'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { AuthPrompt } from '@/components/common/AuthPrompt'
import { useCartStore } from '@/store/cart'
import { useUserStore } from '@/store/user'
import { useToastStore } from '@/store/toast'
import { createOrder } from '@/services/orders'
import { NIGERIA_STATES } from '@/constants/states'
import type { CartItem } from '@/types/cart'

interface CheckoutForm {
  fullName: string
  phone: string
  email: string
  state: string
  city: string
  address: string
  notes: string
}

const initialForm: CheckoutForm = {
  fullName: '',
  phone: '',
  email: '',
  state: '',
  city: '',
  address: '',
  notes: '',
}

function Checkout() {
  const location = useLocation()
  const navigate = useNavigate()
  const { items: cartItems, totalPrice, clearCart } = useCartStore()
  const user = useUserStore((s) => s.user)
  const addToast = useToastStore((s) => s.addToast)
  const [showAuthPrompt, setShowAuthPrompt] = useState(false)

  const buyNowItem = location.state?.buyNow as CartItem | undefined
  const checkoutItems = buyNowItem ? [buyNowItem] : cartItems
  const subtotal = buyNowItem
    ? buyNowItem.price * buyNowItem.quantity
    : totalPrice()

  const [form, setForm] = useState<CheckoutForm>(initialForm)
  const [errors, setErrors] = useState<Partial<CheckoutForm>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (checkoutItems.length === 0) {
    return <Navigate to="/cart" replace />
  }

  function updateField(field: keyof CheckoutForm, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  function validate(): boolean {
    const newErrors: Partial<CheckoutForm> = {}

    if (!form.fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required'
    else if (!/^[\d+\s()-]{7,15}$/.test(form.phone.trim()))
      newErrors.phone = 'Enter a valid phone number'
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = 'Enter a valid email address'
    if (!form.state) newErrors.state = 'State is required'
    if (!form.city.trim()) newErrors.city = 'City is required'
    if (!form.address.trim()) newErrors.address = 'Delivery address is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function submitOrder() {
    setIsSubmitting(true)
    try {
      const { orderId, orderNumber } = await createOrder({
        customer: {
          fullName: form.fullName.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          state: form.state,
          city: form.city.trim(),
          address: form.address.trim(),
        },
        items: checkoutItems,
        subtotal,
        notes: form.notes.trim(),
      })

      if (!buyNowItem) clearCart()

      navigate(`/order/${orderId}`, {
        state: { orderNumber, items: checkoutItems, customer: form, subtotal },
        replace: true,
      })
    } catch {
      addToast('Failed to place order. Please try again.', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validate()) return

    if (!user) {
      setShowAuthPrompt(true)
      return
    }

    await submitOrder()
  }

  const stateOptions = NIGERIA_STATES.map((s) => ({ value: s, label: s }))

  return (
    <section className="py-6 sm:py-8 lg:py-10">
      {showAuthPrompt && (
        <AuthPrompt
          onSuccess={() => {
            setShowAuthPrompt(false)
            submitOrder()
          }}
          onCancel={() => setShowAuthPrompt(false)}
        />
      )}
      <Container>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
          Checkout
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Delivery Information */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white rounded-lg border border-gray-200 p-5 sm:p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Delivery Information
              </h2>

              <div className="space-y-4">
                <Input
                  id="fullName"
                  label="Full Name"
                  placeholder="Enter your full name"
                  value={form.fullName}
                  onChange={(e) => updateField('fullName', e.target.value)}
                  error={errors.fullName}
                  required
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    id="phone"
                    label="Phone Number"
                    type="tel"
                    placeholder="e.g. 08012345678"
                    value={form.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    error={errors.phone}
                    required
                  />
                  <Input
                    id="email"
                    label="Email (optional)"
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    error={errors.email}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Select
                    id="state"
                    label="State"
                    placeholder="Select your state"
                    options={stateOptions}
                    value={form.state}
                    onChange={(e) => updateField('state', e.target.value)}
                    error={errors.state}
                    required
                  />
                  <Input
                    id="city"
                    label="City / Local Government"
                    placeholder="Enter your city"
                    value={form.city}
                    onChange={(e) => updateField('city', e.target.value)}
                    error={errors.city}
                    required
                  />
                </div>

                <Input
                  id="address"
                  label="Delivery Address"
                  placeholder="Enter your full delivery address"
                  value={form.address}
                  onChange={(e) => updateField('address', e.target.value)}
                  error={errors.address}
                  required
                />

                <Textarea
                  id="notes"
                  label="Order Notes (optional)"
                  placeholder="Any special instructions for your order"
                  value={form.notes}
                  onChange={(e) => updateField('notes', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-5 sm:p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {checkoutItems.map((item) => (
                  <div
                    key={item.productId}
                    className="flex gap-3 items-start"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-md object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-gray-900 flex-shrink-0">
                      ₦{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="text-gray-500 italic">To be confirmed</span>
                </div>
                <div className="flex justify-between text-base font-semibold border-t border-gray-200 pt-2">
                  <span>Estimated Total</span>
                  <span>₦{subtotal.toLocaleString()}</span>
                </div>
              </div>

              <p className="text-xs text-gray-500 mt-3">
                Delivery cost will be confirmed after we verify your location.
                Final total may differ.
              </p>

              <Button
                type="submit"
                fullWidth
                size="lg"
                isLoading={isSubmitting}
                className="mt-5"
              >
                Place Order
              </Button>
            </div>
          </div>
        </form>
      </Container>
    </section>
  )
}

export const Component = Checkout
