import { Outlet } from 'react-router-dom'
import { Navbar } from '@/components/common'
import { Footer } from '@/components/common'

export function CustomerLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
