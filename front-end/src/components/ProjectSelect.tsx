import { ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

export default function ProjectSelect({
    selectedProject,
    projects,
    onChange
} : {
    selectedProject: Project | null,
    projects: Project[],
    onChange? : (project: Project) => void;
}){
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="lg" className="w-[30vw] h-[2vw] max-w-72 max-h-72 p-5">{selectedProject?.name} <ChevronDown/></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuGroup>
                    {projects?.map((project) => (
                        <DropdownMenuItem
                            key={project.id}
                            onSelect={() => onChange && onChange(project)}
                        >
                        {project.name}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}