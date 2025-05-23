import '@styles/globals.css'

import { ReactQueryProvider } from '@lib/react-query-provider'
import { Sonner } from '@lib/sonner'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Watch Test',
  description: 'Watch Brasil - technical test',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ReactQueryProvider>
          <Sonner richColors position="top-center" />
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  )
}
