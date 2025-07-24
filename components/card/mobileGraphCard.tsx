"use client";
import React, { useState } from "react";
import ArrowUp from "@/assets/svg/arrow-up.svg";
import ArrowDown from "@/assets/svg/arrow-down.svg";
import Image, { StaticImageData } from "next/image";
import WeatherChart, { WeatherChartProps } from "./weatherChart";
import { cn } from "@/libs/utils";

interface MobileGraphCardProps {
  activityType: string;
  imgSrc: StaticImageData | string | undefined;
  chartDetails?: WeatherChartProps;
  title?: string;
  description?: string;
}

const MobileGraphCard = ({
  activityType,
  title,
  description,
  imgSrc,
  chartDetails,
}: MobileGraphCardProps) => {
  const [isActive, setActive] = useState(false);

  const handleopen = () => {
    setActive((prop) => !prop);
    console.log("holla");
  };

  return (
    <div
      className={cn(
        `w-full flex flex-col items-start p-4 rounded-2xl border  `,
        isActive ? "border-blue-600" : "border-grey-100"
      )}
    >
      <div className="w-full flex items-center justify-between">
        <div className="w-full flex items-center gap-4">
          <div className="rounded-[100px] border border-grey-200 w-10 h-10 flex items-center justify-center">
            {imgSrc && (
              <Image
                src={imgSrc}
                alt={typeof imgSrc === "string" ? imgSrc : "icon"}
                width={24}
                height={24}
              />
            )}
          </div>
          <h2 className="text-md leading-[150%] font-medium text-grey-900">
            {activityType}
          </h2>
        </div>
        <div className="w-full max-w-6 h-6" onClick={() => handleopen()}>
          {isActive ? <ArrowUp /> : <ArrowDown />}
        </div>
      </div>

      <div
        className={cn(
          `w-full flex flex-col gap-10 items-start py-4 transition-all duration-500 ease-in-out overflow-hidden`,
          isActive ? "max-h-[600px] opacity-100 " : "max-h-0 opacity-0"
        )}
      >
        <div className="flex flex-col items-start">
          <h2 className="text-lg leading-[150%] font-bold text-grey-900">
            {title}
          </h2>
          <p className="text-md text-grey-700 leading-[150%]">{description}</p>
        </div>
        <div className="relative w-full min-h-[300px]">
          {chartDetails ? (
            <WeatherChart
              chartData={chartDetails.chartData}
              category={chartDetails.category}
              activity={chartDetails.activity}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-white/30 backdrop-blur-sm rounded-lg">
              <div className="w-12 h-12 border-4 border-grey-400 border-solid border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileGraphCard;
