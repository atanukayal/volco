'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FaGoogle } from 'react-icons/fa'
import Image from 'next/image'
import Link from 'next/link'

export default function SignupPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle signup logic here
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Image
            src="https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png"
            alt="Volco Logo"
            width={80}
            height={80}
            className="mx-auto"
          />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Create your account</h2>
        </div>
        <Card className="backdrop-blur-sm bg-white/30">
          <CardHeader>
            <CardTitle>Join Volco</CardTitle>
            <CardDescription>Enter your details to create an account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full">
                Sign up
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full flex items-center justify-center" onClick={() => {/* Handle Google signup */}}>
              <FaGoogle className="mr-2" />
              Sign up with Google
            </Button>
          </CardFooter>
        </Card>
        <div className="text-center">
          <Link href="/login" className="font-medium text-primary hover:text-primary-dark">
            Already have an account? Sign in
          </Link>
        </div>
      </div>
      <div className="fixed inset-0 z-[-1]">
        <Image
          src="https://images.unsplash.com/photo-1559024094-4a1e4495c3c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>
    </div>
  )
}

