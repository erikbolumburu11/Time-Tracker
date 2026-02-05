'use client'

import { useAuth } from "@/auth/AuthContext";
import Login from "@/components/Login";

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>; // wait until user state is ready

  return (
    <div className="">
      {user ? (
        <>
          <span>Welcome, {user.username}!</span>
        </>
      ) : (
        <>
          <h1 className="text-4xl">Login</h1>
          <Login/>
        </>
      )}
    </div>
  );
}
