'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import toast from 'react-hot-toast';

export default function ProfileSetup() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        try {
          const response = await axios.get(`http://localhost:8070/api/v1/user/profile-status`, {
            headers: {
              Authorization: `Bearer ${currentUser.accessToken}`,
              passcode: process.env.NEXT_PUBLIC_AUTH_CODE,
            },
          });
          
          if (response.data.profileSetup) {
            router.push('/dashboard');
          } else {
            setLoading(false);
          }
        } catch (error) {
          console.error('Error checking profile status:', error);
          toast.error('Error checking profile status. Please try again.');
          setLoading(false);
        }
      } else {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `http://localhost:8070/api/v1/user/complete-profile`,
        { firstName, lastName, bio },
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
            passcode: process.env.NEXT_PUBLIC_AUTH_CODE,
          },
        }
      );

      if (response.status === 200) {
        toast.success('Profile setup completed successfully!');
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Error completing profile setup:', error);
      toast.error('Failed to complete profile setup. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Complete Your Profile</CardTitle>
          <CardDescription>Please provide some additional information to complete your profile setup.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Input
                id="bio"
                type="text"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Completing Profile...' : 'Complete Profile'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

