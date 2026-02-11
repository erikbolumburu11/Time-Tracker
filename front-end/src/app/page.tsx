'use client'

import { useAuth } from "@/auth/AuthContext";
import Login from "@/components/Login";
import { redirect } from "next/navigation";

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>; 
  if (user) redirect('/dashboard')

  return (
    <div className="">
      <h1 className="text-4xl">Login</h1>
      <Login/>
    </div>
  );
}
