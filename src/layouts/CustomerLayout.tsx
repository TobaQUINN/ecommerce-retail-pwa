import { Outlet } from 'react-router-dom'
import { Navbar } from '@/components/common'
import { Footer } from '@/components/common'
import { ScrollToTop } from '@/components/common/ScrollToTop'
import { ToastContainer } from '@/components/common/ToastContainer'

export function CustomerLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ToastContainer />
    </div>
  )
}
