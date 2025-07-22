import React from "react";

interface WeatherParameterCardProps {
  parameter: string;
  icon: React.ReactNode;
  percentage: string;
}

const WeatherParameterCard = ({
  parameter,
  icon,
  percentage,
}: WeatherParameterCardProps) => {
  return (
    <div className="w-full flex flex-col p-4 items-start gap-[27px] border border-grey-100 rounded-2xl">
      <div className="flex items-center justify-between w-full">
        <h4 className="text-gray-600 text-md font-medium">{parameter}</h4>
        {icon}
      </div>
      <p className="text-2xl font-bold text-grey-900">{percentage}</p>
    </div>
  );
};

export default WeatherParameterCard;
