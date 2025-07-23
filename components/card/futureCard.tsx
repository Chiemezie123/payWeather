import Image, { StaticImageData } from "next/image";

interface FutureCardProps {
  date: string;
  image: StaticImageData | string | undefined;
  temperature: string;
}

const FutureCard = ({ date, image, temperature }: FutureCardProps) => {
  return (
    <div className="flex-1  xl:max-w-[76px] w-full h-full flex flex-col gap-4 items-center bg-[linear-gradient(225deg,_#3793FF_-3.36%,_#0017E4_103.57%)] justify-center rounded-2xl bg-grey-50 border border-grey-100 shrink-0">
      <p className="text-white font-bold">{date}</p>
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
      <p className="text-white font-bold">
        {temperature}<span>C</span>
      </p>
    </div>
  );
};

export default FutureCard;
