import { useActiveTimeEntry } from "@/activeTimeEntry/ActiveTimeEntryContext";
import { Button } from "@/components/ui/button"
import api from "@/api/axios";

export default function TimerButton(){
    const { activeTimeEntry, setActiveTimeEntry, getElapsedTime } = useActiveTimeEntry();

    function GetButtonLabel(){
        if(!activeTimeEntry) return (
            <div>Start</div>
        )
        else return (
            <div>
                <div>
                    {formatSeconds(getElapsedTime())}
                </div>
                <div>
                    Stop
                </div>
            </div>
        )
    }

    const handleClick = activeTimeEntry ? StopTimer : StartTimer;

    return (
        <div>
            <Button size="lg" className="
                w-[30vw] h-[30vw] max-w-72 max-h-72
                rounded-full border-4
                text-[clamp(1rem,6vw,2rem)] font-semibold
                flex items-center justify-center
                transition-all duration-200
                hover:scale-105 active:scale-95" 
                onClick={handleClick}
            >
                {GetButtonLabel()}
            </Button>
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

function formatSeconds(totalSeconds: number): string {
    if (!totalSeconds || isNaN(totalSeconds)) return "00:00";

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const paddedMinutes = String(minutes).padStart(2, "0");
    const paddedSeconds = String(seconds).padStart(2, "0");

    return `${paddedMinutes}:${paddedSeconds}`;
}