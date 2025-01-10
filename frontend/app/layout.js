import { Inter } from 'next/font/google'
import './globals.css'
import AOSInitializer from '../components/AOSInitializer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Volvo - Volunteer Platform',
  description: 'Connecting volunteers with organizations',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AOSInitializer />
        {children}
      </body>
    </html>
  )
}

