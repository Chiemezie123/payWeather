import { cn } from "@/lib/utils";

export interface ActivityCardProps {
  imgSrc: string;
  text: string;
  check: string;
  onClick: () => void;
}

const ActivityCard = ({ imgSrc, text, onClick, check }: ActivityCardProps) => {
  return (
    <div
      className={cn(
        `w-full h-[72px] flex items-center gap-4 p-4 rounded-2xl border border-grey-100 cursor-pointer`,
        check === text ? "border border-[#3793FF]" : ""
      )}
      onClick={onClick}
    >
      <div
        className={cn(
          `w-10 h-10 flex items-center justify-center border  rounded-[100px]`,
          check === text ? "border border-[#3793FF]" : "border-grey-100"
        )}
      >
        <img src={imgSrc} alt={imgSrc} className="w-6 h-6" />
      </div>
      <div className="">
        <p className="text-grey-900 font-medium">{text}</p>
      </div>
    </div>
  );
};

export default ActivityCard;
