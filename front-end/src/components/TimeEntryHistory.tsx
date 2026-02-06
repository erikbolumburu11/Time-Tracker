import { useActiveTimeEntry } from "@/activeTimeEntry/ActiveTimeEntryContext";
import api from "@/api/axios";
import { useEffect, useState } from "react";

export default function TimeEntryHistory(){
    const [ timeEntries, setTimeEntries ] = useState<TimeEntry[]>([])
    const { activeTimeEntry } = useActiveTimeEntry();

    useEffect(() => {
        async function getTimeEntries() {
            try {
            const res = await api.get<TimeEntry[]>("/timeEntry");
            setTimeEntries(res.data);
            } catch (err) {
            console.error(err);
            }
        }

        getTimeEntries(); 
        const interval = setInterval(getTimeEntries, 5000); 
        return () => clearInterval(interval); 
    }, [activeTimeEntry]);

    return(
        <div>
            {timeEntries.map((entry) => (
                <div key={entry.id} style={{ marginBottom: "1rem" }}>
                <p><strong>ID:</strong> {entry.id}</p>
                <p><strong>Start Time:</strong> {entry.start_time}</p>
                <p><strong>End Time:</strong> {entry.end_time}</p>
                </div>
            ))}
        </div>
    )
}