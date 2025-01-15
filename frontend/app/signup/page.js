'use client';

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FaGoogle } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/firebase";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = useRouter();

  const checkUsernameAvailability = async (username) => {
    if (!username) return;

    try {
      const response = await axios.post(
        "http://localhost:8070/api/v1/auth/check-username",
        { username }
      );

      if (response.status === 200) {
        toast.success("Username is available!");
        return true;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error checking username");
      return false;
    }
  };

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const usernameAvailable = await checkUsernameAvailability(username);

    if (!usernameAvailable) {
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      const response = await axios.post(
        `http://localhost:8070/api/v1/auth/signup`,
        { username, email, uid },
        {
          headers: {
            Authorization: `Bearer ${userCredential.user.accessToken}`,
            passcode: process.env.NEXT_PUBLIC_AUTH_CODE,
          },
        }
      );

      if (response.status === 201) {
        toast.success("Account created successfully!");
        router.push("/profile-setup");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error(error.message || "Failed to create account.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const response = await axios.post(
        `http://localhost:8070/api/v1/auth/google-signup`,
        { email: user.email, uid: user.uid },
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
            passcode: process.env.NEXT_PUBLIC_AUTH_CODE,
          },
        }
      );

      if (response.status === 201) {
        toast.success("Signed up successfully with Google!");
        router.push("/profile-setup");
      }
    } catch (error) {
      console.error("Error signing up with Google:", error);
      toast.error(error.message || "Failed to sign up with Google.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {isLoggedIn ? (
        <div className="text-center">
          <h2 className="text-2xl font-semibold">
            You are already signed in!
          </h2>
          <Button onClick={() => router.push("/dashboard")}>
            Go to Dashboard
          </Button>
        </div>
      ) : (
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <Image
              src="https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png"
              alt="Volco Logo"
              width={80}
              height={80}
              className="mx-auto"
            />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Create your account
            </h2>
          </div>
          <Card className="backdrop-blur-sm bg-white/30">
            <CardHeader>
              <CardTitle>Join Volco</CardTitle>
              <CardDescription>
                Enter your details to create an account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Username</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Signing up..." : "Sign up"}
                </Button>
              </form>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full flex items-center justify-center"
                onClick={handleGoogleLogin}
              >
                <FaGoogle className="mr-2" />
                Sign up with Google
              </Button>
            </CardFooter>
          </Card>
          <div className="text-center">
            <Link
              href="/login"
              className="font-medium text-primary hover:text-primary-dark"
            >
              Already have an account? Sign in
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

