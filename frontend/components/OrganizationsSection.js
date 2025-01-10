import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building, Users, Calendar, Award } from 'lucide-react'
import Image from 'next/image'

const organizations = [
  { name: "Local Food Bank", description: "Providing meals to those in need", icon: Building, image: "https://images.unsplash.com/photo-1593113630400-ea4288922497?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" },
  { name: "City Animal Shelter", description: "Caring for abandoned animals", icon: Users, image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" },
  { name: "Community Garden", description: "Growing fresh produce for the community", icon: Calendar, image: "https://images.unsplash.com/photo-1592150621744-aca64f48394a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80" },
  { name: "Youth Mentorship Program", description: "Guiding the next generation", icon: Award, image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2049&q=80" },
]

export default function OrganizationsSection() {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8" data-aos="fade-up">Organizations</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {organizations.map((org, index) => (
            <Card key={index} data-aos="fade-up" data-aos-delay={index * 100}>
              <CardHeader className="p-0">
                <div className="relative h-48">
                  <Image
                    src={org.image}
                    alt={org.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>
                <div className="p-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                    {org.icon && <org.icon size={24} />}
                  </div>
                  <CardTitle className="text-lg md:text-xl">{org.name}</CardTitle>
                  <CardDescription className="text-sm md:text-base">{org.description}</CardDescription>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

