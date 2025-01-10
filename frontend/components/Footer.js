import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-sm">Volco connects passionate individuals with meaningful volunteering opportunities, making a positive impact in our communities.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-secondary">Home</Link></li>
              <li><Link href="#" className="hover:text-secondary">Opportunities</Link></li>
              <li><Link href="#" className="hover:text-secondary">About Us</Link></li>
              <li><Link href="#" className="hover:text-secondary">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-sm">Email: info@volco.com</p>
            <p className="text-sm">Phone: (123) 456-7890</p>
            <p className="text-sm">Address: 123 Volunteer St, City, State 12345</p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-secondary"><Facebook size={20} /></a>
              <a href="#" className="hover:text-secondary"><Twitter size={20} /></a>
              <a href="#" className="hover:text-secondary"><Instagram size={20} /></a>
              <a href="#" className="hover:text-secondary"><Linkedin size={20} /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-sm">&copy; 2023 Volco. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

