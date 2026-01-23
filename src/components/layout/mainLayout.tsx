import type React from 'react'
import { Outlet } from 'react-router-dom'
import { Breadcrumbs } from '../ui/breadcrumbs'
import { Header } from './header'
import { Sidebar } from './sidebar'

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="md:ml-64 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-6">
          <Breadcrumbs />
          {children}
          <Outlet />
        </main>
      </div>
    </div>
  )
}
