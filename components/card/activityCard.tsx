import { cn } from "@/libs/utils";
import { StaticImageData } from "next/image";
import Image from "next/image";


export interface ActivityCardProps {
  imgSrc: StaticImageData;
  text: string;
  check: string;
  onClick: () => void;
   onMouseEnter:()=> void
}

const ActivityCard = ({ imgSrc, text, onClick, check , onMouseEnter}: ActivityCardProps) => {
  return (
    <div
      className={cn(
        `w-full h-[72px] flex items-center gap-4 p-4 rounded-2xl border border-grey-100 cursor-pointer`,
        check === text
          ? "border border-[#0017E4]"
          : ""
      )}
      onClick={onClick}
    >
      <div
        className={cn(
          `w-10 h-10 flex items-center justify-center border rounded-[100px]`,
          check === text
            ? "border border-[#0017E4]"
            : "border-grey-100"
        )}
      >
        <Image
          src={imgSrc}
          alt={text}
          width={24}
          height={24}
          className="w-6 h-6"
        />
      </div>
      <div className="">
        <p className="text-grey-900 font-medium">{text}</p>
      </div>
    </div>
  );
};

export default ActivityCard;
