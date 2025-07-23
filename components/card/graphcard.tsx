import Image, { StaticImageData } from "next/image";

import type { WeatherChartProps } from "./weatherChart";
import WeatherChart from "./weatherChart";

interface GraphcardProps {
  title: string;
  description: string;
  chartDetails?: WeatherChartProps;
  imgSrc?: StaticImageData | string | undefined;
}

const Graphcard = ({
  title,
  description,
  chartDetails,
  imgSrc,
  
}: GraphcardProps) => {
  return (
    <div className=" w-full flex flex-col items-start gap-12 rounded-2xl border p-4">
      <div className="flex flex-col items-start justify-center gap-2">
        <div className="rounded-[100px] border border-grey-200 w-10 h-10 flex items-center justify-center">
          {imgSrc && (
            <Image
              src={imgSrc}
              alt={typeof imgSrc === "string" ? imgSrc : "icon"}
              width={24}
              height={24}
            />
          )}
          <img />
        </div>
        <div className="flex flex-col items-start ">
          <h2 className="text-lg leading-[150%] font-bold text-grey-900">
            {title}
          </h2>
          <p className="text-md text-grey-700 leading-[150%]">{description}</p>
        </div>
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
  );
};

export default Graphcard;
