import { useActiveTimeEntry } from "@/activeTimeEntry/ActiveTimeEntryContext";
import api from "@/api/axios";
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { useProjects } from "@/project/ProjectContext";

export default function TimeEntryHistory(){
    const [ timeEntries, setTimeEntries ] = useState<TimeEntry[]>([])
    const { activeTimeEntry } = useActiveTimeEntry();
    const { projects } = useProjects();

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
    }, [activeTimeEntry]);

    return(
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Project</TableHead>
                    <TableHead>Start</TableHead>
                    <TableHead>End</TableHead>
                    <TableHead>Duration</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {timeEntries.toReversed().map(entry => (
                <TableRow key={entry.id}>
                    <TableCell>{getProjectFromId(projects, entry.project_id)?.name}</TableCell>
                    <TableCell>{formatTime(entry.start_time)}</TableCell>
                    <TableCell>{formatTime(entry.end_time)}</TableCell>
                    <TableCell>{getDuration(entry.start_time, entry.end_time)}</TableCell>
                </TableRow>
                ))}
            </TableBody>
        </Table>
    )

    function getProjectFromId(projects: Project[], id: number) : Project | undefined {
        return projects.find(project => project.id == id);
    }

    function formatTime(date_time: string | null) : string {
        if(!date_time) return ""
        const date = new Date(date_time)

        const hours = date.getHours().toString().padStart(2, "0")
        const minutes = date.getMinutes().toString().padStart(2, "0")

        return `${hours}:${minutes}`
    }

    function getDuration(start_time: string, end_time: string | null) : string | null {
        if (!start_time || !end_time) return null

        const start = new Date(start_time).getTime()
        const end = new Date(end_time).getTime()

        if (isNaN(start) || isNaN(end) || end < start) return null

        const diffMs = end - start
        const totalSeconds = Math.floor(diffMs / 1000)

        const hours = Math.floor(totalSeconds / 3600)
        const minutes = Math.floor((totalSeconds % 3600) / 60)
        const seconds = totalSeconds % 60

        return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    }
}