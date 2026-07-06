import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Value Arcade — Johnathan Valencia',
  description: 'A 2-minute interactive proof of how I create leverage.',
}

export default function PuntLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div 
      className="punt-page" 
      style={{ 
        minHeight: '100vh',
        backgroundColor: '#0a0a0f',
        color: '#e4e4e7',
        position: 'relative',
        zIndex: 9999999
      }}
    >
      {children}
    </div>
  )
}
