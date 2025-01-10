import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import Image from "next/image"

export default function Hero() {
  return (
    <section className="relative bg-primary text-white py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1559024094-4a1e4495c3c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
          alt="Volunteers working together" 
          layout="fill"
          objectFit="cover"
          quality={100}
        />
        <div className="absolute inset-0 bg-primary opacity-75"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mt-5" data-aos="fade-right">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4">Welcome to Volco</h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-8">Connecting passionate volunteers with meaningful opportunities</p>
          <Button size="lg" variant="secondary" className="group">
            Get Started
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  )
}

