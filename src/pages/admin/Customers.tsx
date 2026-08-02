import { useEffect, useState } from 'react'
import { Spinner } from '@/components/ui/Spinner'
import { EmptyState } from '@/components/ui/EmptyState'
import { getAllCustomers } from '@/services/admin-orders'

function Customers() {
  const [customers, setCustomers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    getAllCustomers()
      .then(setCustomers)
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner />
      </div>
    )
  }

  const filtered = search.trim()
    ? customers.filter((c) => {
        const q = search.toLowerCase()
        return (
          c.fullName?.toLowerCase().includes(q) ||
          c.phone?.toLowerCase().includes(q) ||
          c.email?.toLowerCase().includes(q) ||
          c.state?.toLowerCase().includes(q)
        )
      })
    : customers

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
        <p className="text-sm text-gray-500 mt-1">
          {customers.length} registered customer{customers.length !== 1 ? 's' : ''}
        </p>
      </div>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name, phone, email or state..."
        className="w-full sm:max-w-sm px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
      />

      {filtered.length === 0 ? (
        <EmptyState
          title="No customers found"
          description={search ? 'Try a different search term.' : 'Customers will appear here after their first order.'}
        />
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {/* Desktop table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-5 py-3 font-medium text-gray-600">Name</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-600">Phone</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-600">Email</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-600">State</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-600">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50">
                    <td className="px-5 py-3 font-medium text-gray-900">{customer.fullName}</td>
                    <td className="px-5 py-3 text-gray-600">{customer.phone}</td>
                    <td className="px-5 py-3 text-gray-600">{customer.email || '—'}</td>
                    <td className="px-5 py-3 text-gray-600">{customer.state}</td>
                    <td className="px-5 py-3 text-gray-500">
                      {customer.createdAt?.toLocaleDateString('en-NG', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      }) ?? '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="sm:hidden divide-y divide-gray-100">
            {filtered.map((customer) => (
              <div key={customer.id} className="px-4 py-3">
                <p className="text-sm font-medium text-gray-900">{customer.fullName}</p>
                <p className="text-xs text-gray-500 mt-0.5">{customer.phone}</p>
                {customer.email && (
                  <p className="text-xs text-gray-500">{customer.email}</p>
                )}
                <p className="text-xs text-gray-400 mt-0.5">
                  {customer.state} · {customer.createdAt?.toLocaleDateString('en-NG', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  }) ?? '—'}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export const Component = Customers
