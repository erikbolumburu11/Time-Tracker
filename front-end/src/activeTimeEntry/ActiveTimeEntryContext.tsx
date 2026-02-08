'use client'

import api from "@/api/axios";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface TimeEntryContextType {
  activeTimeEntry: TimeEntry | null;
  setActiveTimeEntry: (timer: TimeEntry | null) => void;
  getElapsedTime: () => number;
}

const ActiveTimeEntryContext = createContext<TimeEntryContextType | undefined>(undefined);

export function ActiveTimeEntryProvider({ children }: { children: ReactNode }) {
    const [activeTimeEntry, setActiveTimeEntry] = useState<TimeEntry | null>(null);

    useEffect(() => {
        async function fetchActiveTimeEntry() {
            try {
                const res = await api.get<TimeEntry | null>("/timeEntry/active"); 
                if (res.data) {
                    setActiveTimeEntry(res.data);
                } else {
                    setActiveTimeEntry(null);
                }
            } catch (err) {
                console.error("Error fetching active time entry:", err);
            }
        }

        fetchActiveTimeEntry();
    }); 

    function getElapsedTime(): number {
        if (!activeTimeEntry) return 0;
        if (!activeTimeEntry?.start_time) return 0;

        const start = new Date(activeTimeEntry.start_time).getTime();
        if (isNaN(start)) return 0;
        const now = Date.now();

        return Math.floor((now - start) / 1000); // seconds
    }

    return (
        <ActiveTimeEntryContext.Provider value={{ 
            activeTimeEntry,
            setActiveTimeEntry,
            getElapsedTime
         }}>
        {children}
        </ActiveTimeEntryContext.Provider>
    );
}

export function useActiveTimeEntry() {
  const context = useContext(ActiveTimeEntryContext);
  if (!context) throw new Error("useActiveTimeEntry must be used within TimerProvider");
  return context;
}

export function getActiveTimeRunning(){

}