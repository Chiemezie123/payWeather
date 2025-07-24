"use client";
import { useEffect, useState } from "react";
import { activityCardData, LAT, LON } from "@/constants/option";
import ActivityCard from "@/components/card/activityCard";
import Graphcard from "@/components/card/graphcard";
import { useWeather } from "@/hooks/useWeather";
import Mountain from "@/assets/images/Mountain.png";
import Running from "@/assets//images/Man_Running.png";
import Picnic from "@/assets/images/Umbrella_On_Ground.png";
import Stargazing from "@/assets/images/Shooting_Star.png";
import { useScreenSize } from "@/hooks/useScreensize";
import { ActivityType, WeatherCategory } from "@/components/card/weatherChart";
import MobileGraphCard from "@/components/card/mobileGraphCard";
import { useRecommendationData } from "@/hooks/useRecommendationData";
import {
  HourlyWeatherData,
  ChartDataItem,
  processChartDataActivity,
} from "@/features/weather/types/weather";

const Activities = () => {
  const { weather } = useWeather(LAT, LON);
  const isMobile = useScreenSize();

  const {
    getData,
    prefetchData,
    loading: recommendationLoading,
  } = useRecommendationData<ActivityType>(weather?.hourly, processChartDataActivity);

  const [mobileCards, setMobileCards] = useState<
    {
      activityType: ActivityType;
      chartData: ChartDataItem[];
      recommendation: { title: string; description: string };
    }[]
  >([]);

  const [weatherType, setWeatherType] = useState<
    "hiking" | "running" | "picnic" | "stargazing"
  >("hiking");

  const [recommendation, setRecommendation] = useState({
    title: "Loading...",
    description: "Please wait while we generate a summary.",
  });

  const [chartData, setChartData] = useState<ChartDataItem[]>([]);

  const selectActivityImage = [
    {
      name: "hiking",
      imgSrc: Mountain,
    },
    {
      name: "running",
      imgSrc: Running,
    },
    {
      name: "picnic",
      imgSrc: Picnic,
    },
    {
      name: "stargazing",
      imgSrc: Stargazing,
    },
  ];

  useEffect(() => {
    const init = async () => {
      if (!weather?.hourly || isMobile) return;

      const result = await getData(weatherType);
      setChartData(result.chartData);
      setRecommendation(result.recommendation);
    };

    init();
  }, [weather, weatherType, isMobile]);

  useEffect(() => {
    const fetchAll = async () => {
      if (!weather?.hourly || !isMobile) return;

      const results = await Promise.all(
        activityCardData.map(async (card) => {
          const type = card.text as ActivityType;
          const result = await getData(type);

          return {
            activityType: type,
            chartData: result.chartData,
            recommendation: result.recommendation,
          };
        })
      );

      setMobileCards(results);
    };

    fetchAll();
  }, [weather, isMobile]);

  return (
    <div className="w-full flex flex-col md:flex-row gap-4 items-start">
      {!isMobile && (
        <>
          <div className="w-full flex flex-col items-start md:max-w-[262px] gap-[15px]">
            {activityCardData.map((card, index) => (
              //   <ActivityCard
              //     check={weatherType}
              //     key={index}
              //     imgSrc={card.imgSrc}
              //     text={card.text}
              //     onClick={() => setWeatherType(card.text as typeof weatherType)}
              //   />

              <ActivityCard
                check={weatherType}
                key={index}
                imgSrc={card.imgSrc}
                text={card.text}
                onClick={async () => {
                  setRecommendation({
                    title: "Loading...",
                    description:
                      "Please wait while we generate your recommendation.",
                  });
                  setWeatherType(card.text as ActivityType);

                  const result = await getData(card.text as ActivityType);
                  setChartData(result.chartData);
                  setRecommendation(result.recommendation);
                }}
                onMouseEnter={() => prefetchData(card.text as ActivityType)}
              />
            ))}
          </div>

          <div className="w-full">
            <Graphcard
              title={recommendation?.title}
              description={recommendation?.description}
              chartDetails={
                chartData.length > 0
                  ? { chartData, activity: weatherType }
                  : undefined
              }
              imgSrc={
                selectActivityImage.find((item) => item.name === weatherType)
                  ?.imgSrc || ""
              }
            />
          </div>
        </>
      )}

      {isMobile &&
        mobileCards.map((card, i) => (
          <MobileGraphCard
            key={i}
            activityType={card.activityType}
            imgSrc={
              selectActivityImage.find(
                (item) => item.name === card.activityType
              )?.imgSrc || ""
            }
            chartDetails={{
              chartData: card.chartData,
              activity: card.activityType,
            }}
            title={card.recommendation.title}
            description={card.recommendation.description}
          />
        ))}
    </div>
  );
};

export default Activities;
