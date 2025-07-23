import { cn } from "@/libs/utils";
import React from "react";

interface SideBarcardProps {
  icon: React.ReactNode;
  text: string;
  index: number;
}

const SideBarcard = ({ icon, text, index }: SideBarcardProps) => {
  return (
    <div
    key={index}
      className={cn(
        `w-full flex gap-4 items-center p-3`,
        text === "Current Weather" ? "bg-grey-50 rounded-[8px]" : ""
      )}
    >
      <div className="w-fit">{icon}</div>
      <div className="w-full">
        <h2
          className={cn(
            ` font-medium text-md`,
            text === "Current Weather" ? "text-primary-blue" : "text-grey-600"
          )}
        >
          {text}
        </h2>
      </div>
    </div>
  );
};

export default SideBarcard;
