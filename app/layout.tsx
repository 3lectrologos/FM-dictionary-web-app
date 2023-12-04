import type { Metadata } from 'next'
import { Inter, Lora, Inconsolata } from 'next/font/google'
import './globals.css'
import ThemeProvider from '@/app/ThemeProvider'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
})
const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora'
})
const inconsolata = Inconsolata({
  subsets: ['latin'],
  variable: '--font-inconsolata'
})

export const metadata: Metadata = {
  title: 'Dictionary Web App'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${lora.variable} ${inconsolata.variable} font-sans`}>
        <ThemeProvider>
          <main>
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
