'use client'

import api from "@/api/axios";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

interface ProjectsContextType {
  projects: Project[];
  refreshProjects: () => Promise<void>;
}

export function ProjectsProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);

    const fetchProjects = useCallback(async () => {
      try {
        const res = await api.get<Project[]>("/project");
        setProjects(res.data);
      } catch {
        setProjects([]);
      }
  }, []);

  useEffect(() => {
    const loadProjects = async () => {
      await fetchProjects();
    };
    loadProjects();
  }, [fetchProjects]);


  return (
    <ProjectsContext.Provider
      value={{
        projects,
        refreshProjects: fetchProjects,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
}

export const useProjects = () => {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error("useProjects must be used within ProjectsProvider");
  }
  return context;
};

const ProjectsContext = createContext<ProjectsContextType | null>(null);