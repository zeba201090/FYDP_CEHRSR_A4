import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '../component/navbar2'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CEHSRS',
}

export default function WelcomePatientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        
      </body>
    </html>
  )
}
