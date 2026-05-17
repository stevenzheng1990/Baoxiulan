import Link from 'next/link'
import { ReactNode } from 'react'

// This layout provides the admin shell (sidebar + content area).
// Individual pages call requireAdmin() themselves — this keeps the
// login page accessible without being wrapped in the sidebar chrome.

async function LogoutButton() {
  return (
    <form
      action={async () => {
        'use server'
        const { cookies } = await import('next/headers')
        const { redirect } = await import('next/navigation')
        const cookieStore = await cookies()
        cookieStore.set('admin_session', '', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax' as const,
          maxAge: 0,
          path: '/',
        })
        redirect('/admin/login')
      }}
    >
      <button
        type="submit"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          width: '100%',
          padding: '10px 16px',
          background: 'none',
          border: 'none',
          borderRadius: 8,
          cursor: 'pointer',
          color: 'rgba(255,255,255,0.7)',
          fontSize: 14,
          textAlign: 'left',
          transition: 'background 0.15s, color 0.15s',
        }}
        onMouseOver={undefined}
      >
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        退出登录
      </button>
    </form>
  )
}

const navLinks = [
  {
    href: '/admin',
    label: '仪表盘',
    icon: (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    href: '/admin/articles',
    label: '文章管理',
    icon: (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
    ),
  },
  {
    href: '/admin/settings',
    label: '网站设置',
    icon: (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
]

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        fontFamily: "'Noto Sans SC', 'Microsoft YaHei', sans-serif",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: 220,
          minWidth: 220,
          background: '#0003A3',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          zIndex: 40,
        }}
      >
        {/* Brand */}
        <div
          style={{
            padding: '24px 20px 20px',
            borderBottom: '1px solid rgba(255,255,255,0.10)',
          }}
        >
          <Link href="/admin" style={{ textDecoration: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  background: 'rgba(255,255,255,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
                  <path d="M10 2a8 8 0 100 16A8 8 0 0010 2zm.75 11.5h-1.5V9h1.5v4.5zm0-6h-1.5V5.5h1.5V7.5z" />
                </svg>
              </div>
              <div>
                <div style={{ color: '#fff', fontWeight: 700, fontSize: 15, lineHeight: 1.2 }}>
                  宝秀兰医疗
                </div>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11 }}>后台管理</div>
              </div>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: '16px 12px' }}>
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 12px',
                borderRadius: 8,
                color: 'rgba(255,255,255,0.80)',
                fontSize: 14,
                marginBottom: 4,
                transition: 'background 0.15s, color 0.15s',
                textDecoration: 'none',
              }}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div
          style={{
            padding: '12px',
            borderTop: '1px solid rgba(255,255,255,0.10)',
          }}
        >
          <LogoutButton />
        </div>
      </aside>

      {/* Main content */}
      <div style={{ marginLeft: 220, flex: 1, minWidth: 0 }}>
        {children}
      </div>
    </div>
  )
}
