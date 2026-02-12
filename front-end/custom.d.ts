interface TimeEntry {
    id: number;
    project_id: number;
    start_time: string;
    end_time: string | null;
}

interface Project {
    id: number;
    name: string;
}