'use client'

import api from "@/api/axios";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface TimeEntryContextType {
  activeTimeEntry: TimeEntry | null;
  setActiveTimeEntry: (timer: TimeEntry | null) => void;
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

    return (
        <ActiveTimeEntryContext.Provider value={{ activeTimeEntry, setActiveTimeEntry }}>
        {children}
        </ActiveTimeEntryContext.Provider>
    );
}

export function useActiveTimeEntry() {
  const context = useContext(ActiveTimeEntryContext);
  if (!context) throw new Error("useActiveTimeEntry must be used within TimerProvider");
  return context;
}