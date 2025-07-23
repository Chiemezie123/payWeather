import Image, { StaticImageData } from "next/image";

interface FutureCardProps {
  date: string;
  image: StaticImageData | string | undefined;
  temperature: string;
}

const FutureCard = ({ date, image, temperature }: FutureCardProps) => {
  return (
    <div className="flex-1  xl:max-w-[76px] w-full h-full flex flex-col gap-4 items-center justify-center rounded-2xl bg-grey-50 border border-grey-100 shrink-0">
      <p className="text-grey-600 font-bold">{date}</p>
      <div className="">
        {image && (
          <Image
            src={image}
            alt={typeof image === "string" ? image : "weather icon"}
            width={48}
            height={48}
          />
        )}
      </div>
      <p className="text-grey-600 font-bold">
        {temperature}<span>C</span>
      </p>
    </div>
  );
};

export default FutureCard;
