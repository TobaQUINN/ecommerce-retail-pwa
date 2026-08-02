import { useEffect, useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Spinner } from '@/components/ui/Spinner'
import { useUserStore } from '@/store/user'
import { subscribeToOrder } from '@/services/orders'
import { updateOrderStatus } from '@/services/admin-orders'
import { subscribeToMessages, sendMessage, type Message } from '@/services/messages'
import { ORDER_STATUSES } from '@/constants'
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

function OrderDetail() {
  const { orderId } = useParams()
  const user = useUserStore((s) => s.user)
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [updatingStatus, setUpdatingStatus] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!orderId) return
    return subscribeToOrder(orderId, (data) => {
      setOrder(data)
      setLoading(false)
    })
  }, [orderId])

  useEffect(() => {
    if (!orderId) return
    return subscribeToMessages(orderId, setMessages)
  }, [orderId])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function handleStatusChange(newStatus: OrderStatus) {
    if (!orderId) return
    setUpdatingStatus(true)
    try {
      await updateOrderStatus(orderId, newStatus)
    } finally {
      setUpdatingStatus(false)
    }
  }

  async function handleSend() {
    if (!newMessage.trim() || !user || !orderId) return
    setSending(true)
    try {
      await sendMessage(
        orderId,
        user.uid,
        user.displayName || 'Staff',
        'staff',
        newMessage.trim()
      )
      setNewMessage('')
    } finally {
      setSending(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner />
      </div>
    )
  }

  if (!order) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-600">Order not found.</p>
        <Link to="/admin/orders" className="text-accent hover:underline mt-2 inline-block">
          Back to Orders
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          to="/admin/orders"
          className="p-2 text-gray-500 hover:text-gray-700 rounded-md hover:bg-gray-100"
        >
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-gray-900 font-mono">
            {order.orderNumber}
          </h1>
          {order.createdAt && (
            <p className="text-sm text-gray-500">
              {order.createdAt.toLocaleDateString('en-NG', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Order details */}
        <div className="lg:col-span-2 space-y-5">
          {/* Status management */}
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700">Status:</span>
                <Badge variant={statusColors[order.orderStatus as OrderStatus] ?? 'neutral'}>
                  {order.orderStatus}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={order.orderStatus}
                  onChange={(e) => handleStatusChange(e.target.value as OrderStatus)}
                  disabled={updatingStatus}
                  className="px-3 py-1.5 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  {ORDER_STATUSES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h2 className="text-base font-semibold text-gray-900 mb-3">Order Items</h2>
            <div className="space-y-3">
              {order.items?.map((item: any) => (
                <div key={item.productId} className="flex gap-3 items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-md object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    ₦{(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 mt-4 pt-3 space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span>₦{order.subtotal?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Delivery Fee</span>
                <span>{order.deliveryFee > 0 ? `₦${order.deliveryFee.toLocaleString()}` : 'Not set'}</span>
              </div>
              <div className="flex justify-between font-semibold text-sm pt-1 border-t border-gray-100">
                <span>Total</span>
                <span>₦{order.total?.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Delivery info */}
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h2 className="text-base font-semibold text-gray-900 mb-3">Delivery Details</h2>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-500">Address</dt>
                <dd className="text-gray-900 text-right max-w-[60%]">{order.deliveryAddress}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Method</dt>
                <dd className="text-gray-900 capitalize">{order.deliveryMethod}</dd>
              </div>
              {order.notes && (
                <div className="flex justify-between">
                  <dt className="text-gray-500">Notes</dt>
                  <dd className="text-gray-900 text-right max-w-[60%] italic">{order.notes}</dd>
                </div>
              )}
            </dl>
          </div>
        </div>

        {/* Right: Chat */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 flex flex-col h-[500px] sticky top-8">
            <div className="px-4 py-3 border-b border-gray-200">
              <h2 className="text-sm font-semibold text-gray-900">Customer Chat</h2>
              <p className="text-xs text-gray-500">Communicate about this order</p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 && (
                <p className="text-xs text-gray-400 text-center mt-8">
                  No messages yet. Start the conversation with the customer.
                </p>
              )}
              {messages.map((msg) => {
                const isStaff = msg.senderRole === 'staff'
                return (
                  <div
                    key={msg.id}
                    className={`flex ${isStaff ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-3 py-2 ${
                        isStaff
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      {!isStaff && (
                        <p className="text-xs font-medium mb-0.5 opacity-70">
                          {msg.senderName}
                        </p>
                      )}
                      <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                      {msg.createdAt && (
                        <p className={`text-[10px] mt-1 ${isStaff ? 'opacity-60' : 'text-gray-400'}`}>
                          {msg.createdAt.toLocaleTimeString('en-NG', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      )}
                    </div>
                  </div>
                )
              })}
              <div ref={chatEndRef} />
            </div>

            <div className="px-3 py-3 border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSend()
                    }
                  }}
                  placeholder="Message customer..."
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                  disabled={sending}
                />
                <Button
                  size="sm"
                  onClick={handleSend}
                  disabled={!newMessage.trim() || sending}
                >
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const Component = OrderDetail
