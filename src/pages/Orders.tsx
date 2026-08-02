import { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Container } from '@/components/ui/Container'
import { Badge } from '@/components/ui/Badge'
import { Spinner } from '@/components/ui/Spinner'
import { EmptyState } from '@/components/ui/EmptyState'
import { useUserStore } from '@/store/user'
import { getUserOrders } from '@/services/orders'
import type { OrderStatus } from '@/types'

const statusColors: Record<OrderStatus, 'neutral' | 'success' | 'warning' | 'error'> = {
  'Pending Verification': 'warning',
  'Ready for Payment': 'warning',
  'Payment Submitted': 'neutral',
  'Payment Confirmed': 'success',
  'Processing': 'neutral',
  'Ready for Pickup': 'success',
  'Out for Delivery': 'success',
  'Delivered': 'success',
  'Cancelled': 'error',
}

function Orders() {
  const user = useUserStore((s) => s.user)
  const isLoading = useUserStore((s) => s.isLoading)
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    getUserOrders(user.uid)
      .then(setOrders)
      .finally(() => setLoading(false))
  }, [user])

  if (!isLoading && !user) {
    return <Navigate to="/" replace />
  }

  if (loading || isLoading) {
    return (
      <section className="py-16 flex justify-center">
        <Spinner />
      </section>
    )
  }

  return (
    <section className="py-6 sm:py-8 lg:py-10">
      <Container>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
          My Orders
        </h1>

        {orders.length === 0 ? (
          <EmptyState
            title="No orders yet"
            description="When you place an order, it will appear here."
          />
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Link
                key={order.id}
                to={`/order/${order.id}`}
                className="block bg-white rounded-lg border border-gray-200 p-4 sm:p-5 hover:border-gray-300 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-sm font-mono font-semibold text-gray-900">
                      {order.orderNumber}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {order.items?.length ?? 0} item{order.items?.length !== 1 ? 's' : ''} · ₦{order.subtotal?.toLocaleString()}
                    </p>
                    {order.createdAt && (
                      <p className="text-xs text-gray-400 mt-1">
                        {order.createdAt.toLocaleDateString('en-NG', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </p>
                    )}
                  </div>
                  <Badge variant={statusColors[order.orderStatus as OrderStatus] ?? 'neutral'}>
                    {order.orderStatus}
                  </Badge>
                </div>

                {/* Item thumbnails */}
                <div className="flex gap-2 mt-3">
                  {order.items?.slice(0, 4).map((item: any) => (
                    <img
                      key={item.productId}
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 rounded object-cover border border-gray-100"
                    />
                  ))}
                  {order.items?.length > 4 && (
                    <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                      +{order.items.length - 4}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}

export const Component = Orders
