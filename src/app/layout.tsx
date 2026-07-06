import type { Metadata, Viewport } from 'next'
import '@/styles/tailwind.css'
import '@/styles/style.scss'

export const metadata: Metadata = {
  title: 'Johnathan Valencia',
  description: 'AI Product Leader | Head of Product at PathLLM.ai',
  icons: {
    icon: [
      { url: '/creative/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/creative/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/creative/favicon/apple-touch-icon.png',
  },
  manifest: '/creative/favicon/site.webmanifest',
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="mask-icon" href="/creative/favicon/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
