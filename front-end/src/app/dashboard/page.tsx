'use client'

import { useAuth } from "@/auth/AuthContext";
import ActiveTimeEntry from "@/components/ActiveTimeEntry";
import TimeEntryHistory from "@/components/TimeEntryHistory";
import TimerButton from "@/components/TimerButton";
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
            <button onClick={logout}>Log out</button>
            </div>
        </div>
        <div className="timer">
            <TimerButton/>
            <ActiveTimeEntry/>
            <TimeEntryHistory/>
        </div>
    </div>
  );
}
