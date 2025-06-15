"use client";

import { BellDot } from "lucide-react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";
import EmailList from "./EmailList";

export function SidebarContainer() {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <button className="rounded-lg p-2 text-gray-500  hover:text-gray-700 transition-colors duration-200 ">
          <BellDot />
        </button>
      </DrawerTrigger>
      <DrawerContent className="h-full max-w-sm ml-auto ">
        <DrawerHeader>
          <DrawerTitle>新着メール通知</DrawerTitle>
        </DrawerHeader>

        <EmailList />

        <DrawerClose className="absolute top-4 right-4" />
      </DrawerContent>
    </Drawer>
  );
}
