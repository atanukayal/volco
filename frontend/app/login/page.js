"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaGoogle } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/firebase";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

import dotenv from "dotenv";

export default function LoginPage() {
  dotenv.config();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [manualLogin, setManualLogin] = useState(false); // Add this flag
  const router = useRouter();
  

  useEffect(() => {
    // Check if the user is already logged in
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && !manualLogin) {
        // Skip the logic if manualLogin is true
        toast.success("You are already signed in!");
        router.push("/dashboard"); // Redirect to the dashboard
      }
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, [router, manualLogin]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    

    setManualLogin(true); // Set the flag to true
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const response = await axios.post(
        `http://localhost:8070/api/v1/auth/login/${process.env.NEXT_PUBLIC_AUTH_CODE}`,
        {
          email: userCredential.user.email,
        },
        {
          headers: {
            Authorization: `Bearer ${userCredential.user.accessToken}`,
          },
        }
      );

      if (response.status == 200) {
        toast.success("Login successful");
        router.push("/dashboard");
      }
    } catch (error) {
      console.log("Login error: ", error);
      toast.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setManualLogin(true); // Set the flag to true
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      toast.success("Signed in successfully with Google", user);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error signing in with Google:", error);
      toast.error(error.message || "Failed to sign up with Google.");
    }
  };

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
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <Card className="backdrop-blur-sm bg-white/30">
          <CardHeader>
            <CardTitle>Welcome back</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing in..." : "Sign in"}
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
              Sign in with Google
            </Button>
          </CardFooter>
        </Card>
        <div className="text-center">
          <Link
            href="/signup"
            className="font-medium text-primary hover:text-primary-dark"
          >
            Don't have an account? Sign up
          </Link>
        </div>
      </div>
      <div className="fixed inset-0 z-[-1]">
        <Image
          src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>
    </div>
  );
}
