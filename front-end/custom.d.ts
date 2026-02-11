interface TimeEntry {
    id: number;
    project: number;
    start_time: string;
    end_time: string | null;
}

interface Project {
    id: number;
    name: string;
}