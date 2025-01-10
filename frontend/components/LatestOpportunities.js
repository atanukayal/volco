import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SpaceIcon as Yoga, Trash2, ShoppingBag, PawPrintIcon as Paw } from 'lucide-react'

const latestOpportunities = [
  {
    title: "Yoga Instructor Needed",
    skills: "Yoga Certification",
    location: "City Park",
    icon: Yoga
  },
  {
    title: "Community Cleanup Event",
    skills: "Litter-Picking",
    location: "Downtown",
    icon: Trash2
  },
  {
    title: "Food Bank Assistant",
    skills: "Organization",
    location: "Local Food Bank",
    icon: ShoppingBag
  },
  {
    title: "Animal Shelter Helper",
    skills: "Animal Care",
    location: "City Animal Shelter",
    icon: Paw
  }
]

export default function LatestOpportunities() {
  return (
    <section className="py-12 md:py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8" data-aos="fade-up">Latest Opportunities</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestOpportunities.map((opportunity, index) => (
            <Card key={index} data-aos="fade-up" data-aos-delay={index * 100}>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-2xl mb-4 text-primary">
                  {opportunity.icon && <opportunity.icon size={24} />}
                </div>
                <CardTitle className="text-lg md:text-xl">{opportunity.title}</CardTitle>
                <CardDescription className="text-sm">Skills: {opportunity.skills}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Location: {opportunity.location}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

