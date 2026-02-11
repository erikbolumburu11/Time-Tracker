'use client'

import { useAuth } from "@/auth/AuthContext";
import ProjectSelect from "@/components/ProjectSelect";
import TimeEntryHistory from "@/components/TimeEntryHistory";
import TimerButton from "@/components/TimerButton";
import { Button } from "@/components/ui/button";
import { useProjects } from "@/project/ProjectContext";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { user, loading, logout } = useAuth();
  const { projects } = useProjects();
  const [ selectedProject, setSelectedProject ] = useState<Project | null>(null);

  useEffect(() => {
    if (!selectedProject && projects.length > 0) {
      setSelectedProject(projects[0]);
    }
  }, [projects, selectedProject]);

  if (loading) return <p>Loading...</p>; 
  if(!user) redirect('/')

  return (
    <div className="mx-3">
        <div className="">
            <span>Welcome, {user.username}!</span>
            <Button size="xs" className="m-2 p-2" onClick={logout}>Log out</Button>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="m-2">
            <ProjectSelect
              selectedProject={selectedProject}
              projects={projects}
              onChange={setSelectedProject}
            />
          </div>
          <div className="m-2">
            <TimerButton project={selectedProject}/>
          </div>
        </div>
        <div>
            <h1 className="text-4xl font-semibold">History</h1>
            <TimeEntryHistory/>
        </div>
    </div>
  );
}
