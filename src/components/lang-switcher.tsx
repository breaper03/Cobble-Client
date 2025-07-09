"use client"

import * as React from "react"
import { Globe } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export const LangSwitcher = ({ t }: { t: any }) => {
  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button className="text-foreground hover:text-foreground" variant={"ghost"} size={"icon"}>
              <Globe />
              <span className="sr-only">Toggle Language</span>
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <span className="font-semibold">{t}</span>
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          English
        </DropdownMenuItem>
        <DropdownMenuItem>
          Spanish
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
