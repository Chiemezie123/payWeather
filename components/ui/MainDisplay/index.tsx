import Profile from "./profile";
import WeatherDistribution from "./weatherDistribution";
import Parameters from "./parameters";
import Recommendation from "./recommendation";
import { cn } from "@/libs/utils";

interface MainDisplayProps {
  collapse?: boolean;
}
const MainDisplay = ({ collapse }: MainDisplayProps) => {
  return (
    <section className="w-full h-full">
      <div
        className={cn(
          `flex flex-col gap-8 w-full  mx-auto px-5 lg:px-0 xl:px-5`,
          collapse ? "max-w-[900px] xl:max-w-[1264px]" : "max-w-[700px] xl:max-w-[1096px]"
        )}
      >
        <Profile />
        <WeatherDistribution  collapse={collapse}/>
        <Parameters />
        <Recommendation />
      </div>
    </section>
  );
};

export default MainDisplay;
