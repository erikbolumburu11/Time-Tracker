import { useActiveTimeEntry } from "@/activeTimeEntry/ActiveTimeEntryContext"

export default function ActiveTimeEntry(){
    const { activeTimeEntry } = useActiveTimeEntry();

    return (
        <div>
            Active Time Entry ID: {activeTimeEntry?.id}
        </div>
    )
}