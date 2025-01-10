import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

export default function JoinUsSection() {
  return (
    <section className="py-12 md:py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row-reverse items-center justify-between">
          <div className="md:w-1/2 ml-3 mb-8 md:mb-0" data-aos="fade-left">
            <h2 className="text-2xl  md:text-3xl font-bold mb-4">Join Us</h2>
            <p className="mb-6 text-base md:text-lg">Be part of our community and start volunteering today.</p>
            <Link href="/signup">
              <Button size="lg" variant="outline" className="group w-full md:w-auto">
                Sign Up Now
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0" data-aos="fade-right">
            <Image
              src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Join Us"
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

