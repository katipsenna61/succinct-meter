import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Succinct Score App',
  description: 'Calculate your total contribution score for Succinct',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
