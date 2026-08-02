import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/Badge'
import { Spinner } from '@/components/ui/Spinner'
import { EmptyState } from '@/components/ui/EmptyState'
import { subscribeToAllOrders, type AdminOrder } from '@/services/admin-orders'
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

const STATUS_FILTERS: (OrderStatus | 'All')[] = [
  'All',
  'Pending Verification',
  'Ready for Payment',
  'Payment Submitted',
  'Payment Confirmed',
  'Processing',
  'Out for Delivery',
  'Delivered',
  'Cancelled',
]

function Orders() {
  const [orders, setOrders] = useState<AdminOrder[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<OrderStatus | 'All'>('All')
  const [search, setSearch] = useState('')

  useEffect(() => {
    return subscribeToAllOrders((data) => {
      setOrders(data)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner />
      </div>
    )
  }

  const filtered = orders.filter((order) => {
    if (filter !== 'All' && order.orderStatus !== filter) return false
    if (search.trim()) {
      const q = search.toLowerCase()
      return (
        order.orderNumber?.toLowerCase().includes(q) ||
        order.deliveryAddress?.toLowerCase().includes(q)
      )
    }
    return true
  })

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
        <p className="text-sm text-gray-500 mt-1">
          {orders.length} total order{orders.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Search and filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by order number or address..."
          className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as OrderStatus | 'All')}
          className="px-3 py-2 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-accent"
        >
          {STATUS_FILTERS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Orders list */}
      {filtered.length === 0 ? (
        <EmptyState
          title="No orders found"
          description={search || filter !== 'All' ? 'Try adjusting your filters.' : 'Orders will appear here as customers place them.'}
        />
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-100">
          {filtered.map((order) => (
            <Link
              key={order.id}
              to={`/admin/orders/${order.id}`}
              className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3">
                  <p className="text-sm font-semibold text-gray-900 font-mono">
                    {order.orderNumber}
                  </p>
                  <Badge variant={statusColors[order.orderStatus] ?? 'neutral'}>
                    {order.orderStatus}
                  </Badge>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {order.items?.length} item{order.items?.length !== 1 ? 's' : ''} · ₦{order.subtotal?.toLocaleString()}
                  {order.createdAt && (
                    <> · {order.createdAt.toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })}</>
                  )}
                </p>
                <p className="text-xs text-gray-400 mt-0.5 truncate">
                  {order.deliveryAddress}
                </p>
              </div>
              <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export const Component = Orders
