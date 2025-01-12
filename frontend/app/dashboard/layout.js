"use client";

import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Power } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function DashboardLayout({ children }) {
  const [logoutInProgress, setLogoutInProgress] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user && !logoutInProgress) {
        router.push("/login");
        toast.error("You must login to access this page.");
      }
    });
    return () => unsubscribe();
  }, [router, logoutInProgress]);

  const handleLogout = async () => {
    setLogoutInProgress(true); // Set the logout flag
    try {
      await auth.signOut();
      router.push("/login");
      toast.success("Logged out successfully");
    } catch (error) {
      console.log("Error logging out: ", error);
      toast.error("Failed to log out");
    } finally {
      // setLogoutInProgress(false); // Reset the flag
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      {children}
      <div>
        <Power
          className="absolute top-2 right-2 cursor-pointer"
          onClick={handleLogout}
        />
      </div>
    </div>
  );
}

export default DashboardLayout;
