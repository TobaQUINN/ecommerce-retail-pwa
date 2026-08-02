import { useState } from 'react'
import { seedProducts } from '@/scripts/seed-products'

function Seed() {
  const [status, setStatus] = useState<string>('Ready to seed')
  const [running, setRunning] = useState(false)

  async function handleSeed() {
    setRunning(true)
    setStatus('Seeding...')
    try {
      const result = await seedProducts()
      setStatus(`Done! Seeded ${result.products} products and ${result.categories} categories.`)
    } catch (err: any) {
      setStatus(`Error: ${err.message}`)
    } finally {
      setRunning(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold">Database Seed</h1>
        <p className="text-gray-600">{status}</p>
        <button
          onClick={handleSeed}
          disabled={running}
          className="px-6 py-3 bg-black text-white rounded-lg disabled:opacity-50"
        >
          {running ? 'Seeding...' : 'Seed Products & Categories'}
        </button>
      </div>
    </div>
  )
}

export const Component = Seed
