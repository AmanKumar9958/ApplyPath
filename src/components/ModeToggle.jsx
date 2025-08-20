import { Moon, Sun } from "lucide-react"

import { Button } from "./ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { useTheme } from "./ThemeProvider"

export function ModeToggle() {
    const { setTheme } = useTheme()

    return (
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
            <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            <span className="sr-only">Toggle theme</span>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuPortal>
            <DropdownMenuContent
                align="end"
                className="z-50 min-w-[8rem] rounded-md border bg-popover p-1 text-popover-foreground shadow-md
                data-[side=bottom]:animate-slide-up data-[side=top]:animate-slide-down"
                >
                <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
      </DropdownMenuPortal>
        </DropdownMenu>
    )
}