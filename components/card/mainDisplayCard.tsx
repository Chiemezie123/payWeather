

interface MainDisplayCardProps {
  time: string;
  temperature: string;
  imgSrc: string;
  shortDetail: string;
  shortDescription: string;
}

const MainDisplayCard = ({
  time,
  temperature,
  imgSrc,
  shortDetail,
  shortDescription,
}: MainDisplayCardProps) => {
  return (
    <div className="w-full xl:w-fit flex-1 h-full rounded-2xl p-4 flex flex-col gap-2 bg-grey-50 border border-grey-100 ">
      <div className="flex flex-col gap-2 items-start">
        <h4 className="text-sm font-bold text-grey-600 ">Current Weather</h4>
        <p className="text-grey-600">{time}</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center">
          <div className="flex w-12 h-12 sm:w-20 sm:h-20 p-[12.5px_8.333px] items-center justify-center">
            <img src={imgSrc} alt={imgSrc} />
          </div>
          <div className="flex items-center">
            <p className="text-3xl sm:text-5xl text-grey-900">
              {temperature}
              <span>C</span>
            </p>
          </div>
        </div>
        <div>
          <p className="text-grey-600 font-bold text-md">{shortDetail}</p>
        </div>
      </div>
      <div className="w-full">
        <p className="text-grey-600  text-md">{shortDescription}</p>
      </div>
    </div>
  );
};

export default MainDisplayCard;
