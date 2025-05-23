import '@styles/globals.css'

import { queryClient } from '@lib/react-query'
import { QueryClientProvider } from '@tanstack/react-query'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Watch Brasil',
  description: 'Watch Brasil - technical test',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <link
          rel="icon"
          href="https://watchbr-resources-react.s3.amazonaws.com/assets/themes/watch/favicon.ico"
        />
      </Head>
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  )
}
