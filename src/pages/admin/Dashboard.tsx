import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Package, Users, Clock, MessageSquare } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Spinner } from '@/components/ui/Spinner'
import { subscribeToAllOrders, type AdminOrder } from '@/services/admin-orders'
import { getAllCustomers } from '@/services/admin-orders'
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

function StatCard({ icon: Icon, label, value, color }: {
  icon: any
  label: string
  value: number
  color: string
}) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon size={20} className="text-white" />
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p className="text-sm text-gray-500">{label}</p>
        </div>
      </div>
    </div>
  )
}

function Dashboard() {
  const [orders, setOrders] = useState<AdminOrder[]>([])
  const [customerCount, setCustomerCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = subscribeToAllOrders((data) => {
      setOrders(data)
      setLoading(false)
    })
    getAllCustomers().then((c) => setCustomerCount(c.length))
    return unsub
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner />
      </div>
    )
  }

  const pendingOrders = orders.filter(
    (o) => o.orderStatus === 'Pending Verification'
  )
  const recentOrders = orders.slice(0, 8)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Overview of your store activity</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Package}
          label="Total Orders"
          value={orders.length}
          color="bg-gray-900"
        />
        <StatCard
          icon={Clock}
          label="Pending Review"
          value={pendingOrders.length}
          color="bg-yellow-500"
        />
        <StatCard
          icon={Users}
          label="Customers"
          value={customerCount}
          color="bg-blue-500"
        />
        <StatCard
          icon={MessageSquare}
          label="Active Orders"
          value={orders.filter((o) => !['Delivered', 'Cancelled'].includes(o.orderStatus)).length}
          color="bg-green-600"
        />
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <h2 className="text-base font-semibold text-gray-900">Recent Orders</h2>
          <Link
            to="/admin/orders"
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            View all →
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <p className="px-5 py-8 text-sm text-gray-500 text-center">
            No orders yet.
          </p>
        ) : (
          <div className="divide-y divide-gray-100">
            {recentOrders.map((order) => (
              <Link
                key={order.id}
                to={`/admin/orders/${order.id}`}
                className="flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition-colors"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 font-mono">
                    {order.orderNumber}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {order.items?.length} item{order.items?.length !== 1 ? 's' : ''} · ₦{order.subtotal?.toLocaleString()}
                    {order.createdAt && (
                      <> · {order.createdAt.toLocaleDateString('en-NG', { day: 'numeric', month: 'short' })}</>
                    )}
                  </p>
                </div>
                <Badge variant={statusColors[order.orderStatus] ?? 'neutral'}>
                  {order.orderStatus}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export const Component = Dashboard
