import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

export default function LoginSection() {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0" data-aos="fade-right">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Login</h2>
            <p className="mb-6 text-base md:text-lg">Access your account and start making a difference today.</p>
            <Link href="/login">
              <Button size="lg" className="group w-full md:w-auto">
                Go to Login
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0" data-aos="fade-left">
            <Image
              src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
              alt="Login"
              width={500}
              height={300}
              layout="responsive"
              objectFit="cover"
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

