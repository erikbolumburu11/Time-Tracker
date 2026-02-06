import { useActiveTimeEntry } from "@/activeTimeEntry/ActiveTimeEntryContext";
import api from "@/api/axios";

export default function TimerButton(){
    const { setActiveTimeEntry } = useActiveTimeEntry();

    return (
        <div>
            <button onClick={StartTimer}>Start</button>
            <button onClick={StopTimer}>Stop</button>
        </div>
    ) 

    async function StartTimer(){
        const res = await api.post<TimeEntry>(
            "/timeEntry/start",
            { project_id: 1 }
        );
        setActiveTimeEntry(res.data);
    }

    async function StopTimer(){
        const res = await api.post<TimeEntry>(
            "/timeEntry/stop"
        );
        setActiveTimeEntry(null);
    }

}

