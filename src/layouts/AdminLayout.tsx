import { Outlet } from 'react-router-dom'

export function AdminLayout() {
  return (
    <div className="min-h-screen flex">
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}
