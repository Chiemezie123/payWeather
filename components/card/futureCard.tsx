

interface FutureCardProps {
  date: string;
  image: string;
  temperature: string;
}

const FutureCard = ({ date, image, temperature }: FutureCardProps) => {
  return (
    <div className="max-w-[76px] w-full h-full flex flex-col gap-4 items-center justify-center rounded-2xl bg-grey-50 border border-grey-100 shrink-0">
      <p className="text-grey-600 font-bold">{date}</p>
      <div className="">
        <img src={image} alt={image} />
      </div>
      <p className="text-grey-600 font-bold">{temperature}</p>
    </div>
  );
};

export default FutureCard;
