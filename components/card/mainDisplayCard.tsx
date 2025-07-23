import { cn } from "@/libs/utils";
import Image, { StaticImageData } from "next/image";

interface MainDisplayCardProps {
  time: string;
  temperature: string;
  imgSrc: StaticImageData | string | undefined;
  shortDetail: string;
  shortDescription: string;
  collapse?: boolean;
}

const MainDisplayCard = ({
  time,
  temperature,
  imgSrc,
  shortDetail,
  shortDescription,
  collapse,
}: MainDisplayCardProps) => {
  return (
    <div
      className={cn(
        `w-full  flex-1 h-full rounded-2xl p-4 flex flex-col gap-2 bg-[linear-gradient(225deg,_#3793FF_-3.36%,_#0017E4_103.57%)] border border-grey-100`,
        collapse ? "" : " xl:max-w-[540px]"
      )}
    >
      <div className="flex flex-col gap-2 items-start">
        <h4 className="text-sm font-bold text-white ">Current Weather</h4>
        <p className="text-white">{time}</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center">
          <div className="flex w-12 h-12 sm:w-20 sm:h-20 p-[12.5px_8.333px] items-center justify-center">
            {imgSrc ? (
              <Image src={imgSrc} alt="Weather icon" width={48} height={48} />
            ) : (
              <div className="w-full h-full bg-grey-200 rounded" />
            )}
          </div>
          <div className="flex items-center">
            <p className="text-3xl sm:text-5xl text-white">
              {temperature}
              <span>C</span>
            </p>
          </div>
        </div>
        <div>
          {shortDetail ? (
            <p className="text-white font-bold text-md">{shortDetail}</p>
          ) : (
            <p className="text-white font-bold text-md">
              {" "}
              loading summary ...
            </p>
          )}
        </div>
      </div>
      <div className="w-full">
        <p className="text-white  text-md">{shortDescription}</p>
      </div>
    </div>
  );
};

export default MainDisplayCard;
