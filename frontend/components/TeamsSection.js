import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Heart, Leaf, Book } from 'lucide-react'
import Image from 'next/image'

const teams = [
  { name: "Community Outreach", description: "Connecting with local communities", icon: Users, image: "https://images.unsplash.com/photo-1559024094-4a1e4495c3c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" },
  { name: "Health & Wellness", description: "Promoting healthy living", icon: Heart, image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" },
  { name: "Environmental", description: "Protecting our planet", icon: Leaf, image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2013&q=80" },
  { name: "Education", description: "Empowering through knowledge", icon: Book, image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2022&q=80" },
]

export default function TeamsSection() {
  return (
    <section className="py-12 md:py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8" data-aos="fade-up">Teams</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teams.map((team, index) => (
            <Card key={index} data-aos="fade-up" data-aos-delay={index * 100}>
              <CardHeader className="p-0">
                <div className="relative h-48">
                  <Image
                    src={team.image}
                    alt={team.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>
                <div className="p-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                    {team.icon && <team.icon size={24} />}
                  </div>
                  <CardTitle className="text-lg md:text-xl">{team.name}</CardTitle>
                  <CardDescription className="text-sm md:text-base">{team.description}</CardDescription>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

