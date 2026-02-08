'use client'

import { Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"


export default function ThemeToggle(){
    const { theme, setTheme, systemTheme } = useTheme()

    function ToggleTheme(){
        if(theme == 'system'){
            if(systemTheme == 'dark') setTheme('light');
            if(systemTheme == 'light') setTheme('dark');
        }
        if(theme == 'dark') setTheme('light');
        if(theme == 'light') setTheme('dark');
    }

    return(
        <Button variant="outline" size="icon" onClick={()=>ToggleTheme()}>
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        </Button>
    )
}