import { useEffect, useRef, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Spinner } from '@/components/ui/Spinner'
import { useUserStore } from '@/store/user'
import { subscribeToOrder } from '@/services/orders'
import { subscribeToMessages, sendMessage, type Message } from '@/services/messages'
import type { OrderStatus as OrderStatusType } from '@/types'

const statusColors: Record<OrderStatusType, 'neutral' | 'success' | 'warning' | 'error'> = {
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

function OrderStatus() {
  const { orderId } = useParams()
  const user = useUserStore((s) => s.user)
  const isAuthLoading = useUserStore((s) => s.isLoading)

  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [sending, setSending] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!orderId) return
    const unsub = subscribeToOrder(orderId, (data) => {
      setOrder(data)
      setLoading(false)
    })
    return unsub
  }, [orderId])

  useEffect(() => {
    if (!orderId) return
    return subscribeToMessages(orderId, setMessages)
  }, [orderId])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  if (!isAuthLoading && !user) {
    return <Navigate to="/" replace />
  }

  if (loading || isAuthLoading) {
    return (
      <section className="py-16 flex justify-center">
        <Spinner />
      </section>
    )
  }

  if (!order) {
    return (
      <section className="py-16 text-center">
        <Container>
          <p className="text-gray-600">Order not found.</p>
          <Link to="/orders" className="text-accent hover:underline mt-2 inline-block">
            Back to My Orders
          </Link>
        </Container>
      </section>
    )
  }

  async function handleSend() {
    if (!newMessage.trim() || !user || !orderId) return
    setSending(true)
    try {
      await sendMessage(
        orderId,
        user.uid,
        user.displayName || 'Customer',
        'customer',
        newMessage.trim()
      )
      setNewMessage('')
    } finally {
      setSending(false)
    }
  }

  return (
    <section className="py-6 sm:py-8 lg:py-10">
      <Container>
        <div className="mb-4">
          <Link to="/orders" className="text-sm text-gray-500 hover:text-gray-700">
            ← My Orders
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Order Info */}
          <div className="lg:col-span-2 space-y-5">
            {/* Header */}
            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <p className="text-xs text-gray-500">Order ID</p>
                  <p className="text-lg font-bold font-mono text-gray-900">
                    {order.orderNumber}
                  </p>
                  {order.createdAt && (
                    <p className="text-sm text-gray-500 mt-1">
                      Placed {order.createdAt.toLocaleDateString('en-NG', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  )}
                </div>
                <Badge variant={statusColors[order.orderStatus as OrderStatusType] ?? 'neutral'}>
                  {order.orderStatus}
                </Badge>
              </div>
            </div>

            {/* Items */}
            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <h2 className="text-base font-semibold text-gray-900 mb-3">
                Items
              </h2>
              <div className="space-y-3">
                {order.items?.map((item: any) => (
                  <div key={item.productId} className="flex gap-3 items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-md object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      ₦{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 mt-4 pt-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium">₦{order.subtotal?.toLocaleString()}</span>
                </div>
                {order.deliveryFee > 0 && (
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-gray-500">Delivery</span>
                    <span className="font-medium">₦{order.deliveryFee.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between font-semibold mt-2">
                  <span>Total</span>
                  <span>₦{order.total?.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Delivery */}
            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <h2 className="text-base font-semibold text-gray-900 mb-2">
                Delivery Address
              </h2>
              <p className="text-sm text-gray-700">{order.deliveryAddress}</p>
              {order.notes && (
                <p className="text-sm text-gray-500 mt-2 italic">Note: {order.notes}</p>
              )}
            </div>
          </div>

          {/* Right: Chat */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 flex flex-col h-[500px] sticky top-24">
              <div className="px-4 py-3 border-b border-gray-200">
                <h2 className="text-sm font-semibold text-gray-900">
                  Order Chat
                </h2>
                <p className="text-xs text-gray-500">
                  Chat with our team about this order
                </p>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.length === 0 && (
                  <p className="text-xs text-gray-400 text-center mt-8">
                    No messages yet. Send a message or wait for our team to reach out.
                  </p>
                )}
                {messages.map((msg) => {
                  const isOwn = msg.senderRole === 'customer'
                  return (
                    <div
                      key={msg.id}
                      className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg px-3 py-2 ${
                          isOwn
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        {!isOwn && (
                          <p className="text-xs font-medium mb-0.5 opacity-70">
                            {msg.senderName}
                          </p>
                        )}
                        <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                        {msg.createdAt && (
                          <p className={`text-[10px] mt-1 ${isOwn ? 'opacity-60' : 'text-gray-400'}`}>
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

              {/* Input */}
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
                    placeholder="Type a message..."
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
      </Container>
    </section>
  )
}

export const Component = OrderStatus
