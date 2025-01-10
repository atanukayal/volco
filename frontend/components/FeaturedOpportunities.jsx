'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect } from "react"
import Image from 'next/image'

const opportunities = [
  {
    title: "Event Coordinator",
    category: "Event Planning",
    location: "Civic Center",
    volunteers: 5,
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80"
  },
  {
    title: "Tutoring Assistant",
    category: "Teaching",
    location: "Local School",
    timeCommitment: "2 hours/week",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1173&q=80"
  },
  {
    title: "Youth Mentor",
    category: "Mentoring",
    location: "Youth Center",
    skills: "Patience and Empathy",
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=749&q=80"
  },
  {
    title: "Community Garden Helper",
    category: "Environment",
    location: "Community Garden",
    volunteers: 10,
    image: "https://images.unsplash.com/photo-1592150621744-aca64f48394a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1191&q=80"
  },
  {
    title: "Senior Companion",
    category: "Elderly Care",
    location: "Senior Center",
    timeCommitment: "3 hours/week",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
  }
]

export default function FeaturedOpportunities() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % opportunities.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + opportunities.length) % opportunities.length)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8" data-aos="fade-up">Featured Opportunities</h2>
        <div className="relative" data-aos="fade-up" data-aos-delay="200">
          <Button variant="outline" size="icon" className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10" onClick={prevSlide}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="overflow-hidden">
            <div className="flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
              {opportunities.map((opportunity, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <Card className="mx-auto max-w-sm">
                    <CardHeader>
                      <Image src={opportunity.image} alt={opportunity.title} width={300} height={200} className="w-full h-48 object-cover rounded-t-lg" />
                    </CardHeader>
                    <CardContent>
                      <CardTitle className="text-lg md:text-xl">{opportunity.title}</CardTitle>
                      <CardDescription>{opportunity.category}</CardDescription>
                      <p className="mt-2 text-sm">Location: {opportunity.location}</p>
                      {opportunity.volunteers && <Badge variant="secondary" className="mt-2 text-xs">Volunteers Needed: {opportunity.volunteers}</Badge>}
                      {opportunity.timeCommitment && <Badge variant="secondary" className="mt-2 text-xs">Time Commitment: {opportunity.timeCommitment}</Badge>}
                      {opportunity.skills && <Badge variant="secondary" className="mt-2 text-xs">Skills: {opportunity.skills}</Badge>}
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Learn More</Button>
                    </CardFooter>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          <Button variant="outline" size="icon" className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10" onClick={nextSlide}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}

