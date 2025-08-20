import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

export default function TestDropdown() {
  return (
    <div style={{ padding: 40 }}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Open Dropdown</Button>
        </DropdownMenuTrigger>
  <DropdownMenuContent align="end" disableScrollLock={true}>
          <DropdownMenuItem onClick={() => alert("Item 1")}>Item 1</DropdownMenuItem>
          <DropdownMenuItem onClick={() => alert("Item 2")}>Item 2</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
