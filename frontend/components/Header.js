'use client'

import { useState } from 'react'
import { Search, Menu, X } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-md fixed w-full z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image src="https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png" alt="Volco Logo" width={80} height={24} />
            <span className="ml-2 text-xl font-bold text-primary">Volco</span>
          </Link>
          <div className="hidden md:flex space-x-4">
            <Link href="/" className="text-gray-600 hover:text-primary">Home</Link>
            <Link href="#" className="text-gray-600 hover:text-primary">Opportunities</Link>
            <Link href="#" className="text-gray-600 hover:text-primary">Profile</Link>
            <Link href="/login" className="text-gray-600 hover:text-primary">Login</Link>
            <Link href="/signup" className="text-gray-600 hover:text-primary">Sign Up</Link>
          </div>
          <div className="flex items-center space-x-2">
            <Input type="text" placeholder="Search" className="w-32 md:w-64 hidden md:inline-block" />
            <Button size="icon" className="hidden md:inline-flex">
              <Search className="h-4 w-4" />
            </Button>
            <Button size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        {isMenuOpen && (
          <nav className="mt-4 md:hidden">
            <Link href="/" className="block py-2 text-gray-600 hover:text-primary">Home</Link>
            <Link href="#" className="block py-2 text-gray-600 hover:text-primary">Opportunities</Link>
            <Link href="#" className="block py-2 text-gray-600 hover:text-primary">Profile</Link>
            <Link href="/login" className="block py-2 text-gray-600 hover:text-primary">Login</Link>
            <Link href="/signup" className="block py-2 text-gray-600 hover:text-primary">Sign Up</Link>
            <Input type="text" placeholder="Search" className="mt-2 w-full" />
          </nav>
        )}
      </div>
    </header>
  )
}

