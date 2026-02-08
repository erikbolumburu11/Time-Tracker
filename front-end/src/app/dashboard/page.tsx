'use client'

import { useAuth } from "@/auth/AuthContext";
import ActiveTimeEntry from "@/components/ActiveTimeEntry";
import TimeEntryHistory from "@/components/TimeEntryHistory";
import TimerButton from "@/components/TimerButton";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default function Dashboard() {
  const { user, loading, logout } = useAuth();

  if (loading) return <p>Loading...</p>; 
  if(!user) redirect('/')

  return (
    <div>
        <div className="welcome">
            <div>
            <span>Welcome, {user.username}!</span>
            <Button size="xs" className="m-2 p-2" onClick={logout}>Log out</Button>
            </div>
        </div>
        <div className="flex items-center justify-center">
            <TimerButton/>
        </div>
        <div>
            <h1 className="text-4xl font-semibold">History</h1>
            <TimeEntryHistory/>
        </div>
    </div>
  );
}
