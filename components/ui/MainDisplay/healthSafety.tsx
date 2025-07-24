"use client";
import ActivityCard from "@/components/card/activityCard";
import Graphcard from "@/components/card/graphcard";
import { healthCardData, LAT, LON } from "@/constants/option";
import { useWeather } from "@/hooks/useWeather";
import { useEffect, useState } from "react";
import umbrella from "@/assets/images/Umbrella.png";
import outdoor from "@/assets/images/Beach With Umbrella.png";
import uv from "@/assets/images/Sun.png";
import drive from "@/assets/images/Sport Utility Vehicle.png";
import clothing from "@/assets/images/T Shirt.png";
import heat from "@/assets/images/Thermometer.png";
import { useScreenSize } from "@/hooks/useScreensize";
import MobileGraphCard from "@/components/card/mobileGraphCard";
import { WeatherCategory } from "@/components/card/weatherChart";
import {
  ChartDataItem,
  useRecommendationData,
} from "@/hooks/useRecommendationData";
import { processChartDataHealth } from "@/features/weather/types/weather";

export const HealthSafety = () => {
  const { weather } = useWeather(LAT, LON);
  const isMobile = useScreenSize();
  const {
  getData,
  prefetchData,
  loading: recommendationLoading,
} = useRecommendationData(weather?.hourly, processChartDataHealth);

  const [weatherType, setWeatherType] = useState<WeatherCategory>("outdoor");
  const [chartData, setChartData] = useState<ChartDataItem[]>([]);

  const [recommendation, setRecommendation] = useState({
    title: "Loading...",
    description: "Please wait while we generate a summary.",
  });
  const [mobileCards, setMobileCards] = useState<
    {
      activityType: WeatherCategory;
      chartData: ChartDataItem[];
      recommendation: { title: string; description: string };
    }[]
  >([]);

  const selectImage = [
    { name: "umbrella", imgSrc: umbrella },
    { name: "outdoor", imgSrc: outdoor },
    { name: "clothing", imgSrc: clothing },
    { name: "vehicle", imgSrc: drive },
    { name: "uvindex", imgSrc: uv },
    { name: "heatstroke", imgSrc: heat },
  ];

  
  useEffect(() => {
    const init = async () => {
      if (!weather?.hourly || isMobile) return;

      const result = await getData(weatherType);
      setChartData(result.chartData);
      setRecommendation(result.recommendation);
    };

    init();
  }, [weather, isMobile]);

 
  useEffect(() => {
    const fetchAll = async () => {
      if (!weather?.hourly || !isMobile) return;

      const results = await Promise.all(
        healthCardData.map(async (card) => {
          const type = card.text as WeatherCategory;
          const { chartData, recommendation } = await getData(type);
          return {
            activityType: type,
            chartData,
            recommendation,
          };
        })
      );

      setMobileCards(results);
    };

    fetchAll();
  }, [weather, isMobile]);

  return (
    <div className="w-full flex flex-col lg:flex-row gap-4 items-start">
      {!isMobile && (
        <>
          <div className="w-full flex flex-col items-start lg:max-w-[262px] gap-[15px]">
            {healthCardData.map((card, index) => (
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
                  setWeatherType(card.text as WeatherCategory);

                  const result = await getData(card.text as WeatherCategory);
                  setChartData(result.chartData);
                  setRecommendation(result.recommendation);
                }}
                onMouseEnter={() => prefetchData(card.text as WeatherCategory)}
              />
            ))}
          </div>

          <div className="w-full">
            <Graphcard
              title={recommendation.title}
              description={recommendation.description}
              chartDetails={
                chartData.length > 0
                  ? { chartData, category: weatherType }
                  : undefined
              }
              imgSrc={
                selectImage.find((item) => item.name === weatherType)?.imgSrc ||
                ""
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
              selectImage.find((item) => item.name === card.activityType)
                ?.imgSrc || ""
            }
            chartDetails={{
              chartData: card.chartData,
              category: card.activityType,
            }}
            title={card.recommendation.title}
            description={card.recommendation.description}
          />
        ))}
    </div>
  );
};

export default HealthSafety;
