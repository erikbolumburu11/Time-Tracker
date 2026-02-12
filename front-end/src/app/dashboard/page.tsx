'use client'

import { useAuth } from "@/auth/AuthContext";
import ProjectSelect from "@/components/ProjectSelect";
import TimeEntryHistory from "@/components/TimeEntryHistory";
import TimerButton from "@/components/TimerButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
          <Card className="bg-accent">
            <Tabs defaultValue="history">
              <CardHeader className="flex justify-center">
                <TabsList>
                  <TabsTrigger value="history" className="text-4xl text-primary px-4 py-8 m-2">History</TabsTrigger>
                  <TabsTrigger value="reports" className="text-4xl text-primary px-4 py-8 m-2">Reports</TabsTrigger>
                </TabsList>
              </CardHeader>
              <CardContent>
                <TabsContent value="history">
                  <TimeEntryHistory/>
                </TabsContent>
                <TabsContent value="reports">
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>
        </div>
    </div>
  );
}
