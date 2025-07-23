'use client';
import { useState } from "react";
import SideBar from "@/components/ui/sidebar";
import NavBar from "@/components/ui/navbar";
import MainDisplay from "@/components/ui/MainDisplay";
import { cn } from "@/libs/utils";


export default function Home() {

    const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };

 
  return (
   
    <main className="flex h-screen">
      <SideBar collapse={collapsed} toggleHandler={toggleSidebar} />
      <div
        className={cn(
          "flex flex-col flex-1 overflow-y-auto transition-all duration-300 ease-in-out",
          collapsed ? "ml-0 md:ml-[96px]" : "ml-0 sm:ml-[272px]"
        )}
      >
        <NavBar collapse={collapsed} openSidebar={toggleSidebar} />
        <MainDisplay collapse={collapsed} />
      </div>
    </main>
  );
  
}
