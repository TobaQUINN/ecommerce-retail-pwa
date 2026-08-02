import { Link } from 'react-router-dom'
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import { Container, Button, EmptyState } from '@/components/ui'
import { useCartStore } from '@/store/cart'
import { QuantitySelector } from '@/features/product/QuantitySelector'

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(price)
}

function Cart() {
  const { items, removeItem, updateQuantity, totalItems, totalPrice } = useCartStore()

  if (items.length === 0) {
    return (
      <section className="py-16 sm:py-24">
        <Container>
          <EmptyState
            icon={<ShoppingBag size={48} />}
            title="Your cart is empty"
            description="Looks like you haven't added anything yet. Browse our collection and find something you love."
            action={
              <Link to="/">
                <Button className="gap-2">
                  Continue Shopping
                  <ArrowRight size={16} />
                </Button>
              </Link>
            }
          />
        </Container>
      </section>
    )
  }

  return (
    <section className="py-6 sm:py-8 lg:py-10">
      <Container>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.productId}
                className="flex gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm sm:text-base font-medium text-gray-900 line-clamp-2">
                      {item.name}
                    </h3>
                    <button
                      type="button"
                      onClick={() => removeItem(item.productId)}
                      className="shrink-0 p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <p className="text-sm text-gray-500 mt-0.5">
                    {formatPrice(item.price)} each
                  </p>

                  <div className="flex items-center justify-between mt-3">
                    <QuantitySelector
                      value={item.quantity}
                      onChange={(qty) => updateQuantity(item.productId, qty)}
                    />
                    <span className="text-sm sm:text-base font-bold text-gray-900">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 pb-4 border-b border-gray-100">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Items ({totalItems()})</span>
                  <span className="text-gray-900 font-medium">{formatPrice(totalPrice())}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery</span>
                  <span className="text-gray-500 italic">Calculated at checkout</span>
                </div>
              </div>

              <div className="flex justify-between pt-4 mb-6">
                <span className="text-base font-semibold text-gray-900">Estimated Total</span>
                <span className="text-lg font-bold text-gray-900">{formatPrice(totalPrice())}</span>
              </div>

              <div className="space-y-3">
                <Link to="/checkout">
                  <Button size="lg" fullWidth className="gap-2">
                    Proceed to Checkout
                    <ArrowRight size={16} />
                  </Button>
                </Link>
                <Link to="/">
                  <Button size="lg" fullWidth variant="secondary" className="mt-3">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export const Component = Cart
