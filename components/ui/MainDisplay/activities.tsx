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

export interface HourlyWeatherData {
  dt: number;
  temp: number;
  feels_like?: number;
  weather: Array<{
    description: string;
    icon: string;
  }>;
  humidity: number;
  wind_speed: number;
  uvi: number;
  clouds: number;
  pressure: number;
  visibility: number;
  pop?: number;
  aqi?: number;
}

export interface ProcessedChartData {
  dt: number;
  feels_like?: number;
  temp: number;
  humidity: number;
  pop: number;
  clouds: number;
  uvi: number;
  wind_speed: number;
  aqi?: { value: number };
}

type ChartDataItem =
  | { time: string; score: number }
  | { time: string; precipitation: number }
  | { time: string; temperature: number; precipitation: number }
  | { time: string; uvi: number }
  | { time: string; feels_like: number }
  | { time: string };

const Activities = () => {
  const { weather } = useWeather(LAT, LON);
  const isMobile = useScreenSize();
  const [mobileCards, setMobileCards] = useState<
    {
      activityType: ActivityType;
      chartData: ChartDataItem[];
      recommendation: { title: string; description: string };
    }[]
  >([]);
  const [isActive, setActive] = useState<string>("");

  const [weatherType, setWeatherType] = useState<
    "hiking" | "running" | "picnic" | "stargazing"
  >("hiking");

  const [recommendation, setRecommendation] = useState({
    title: "Loading...",
    description: "Please wait while we generate a summary.",
  });

  const [chartData, setChartData] = useState<{ time: string; value: number }[]>(
    []
  );

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

  function processChartData(
    hourlyData: Array<ProcessedChartData>,
    type: "hiking" | "running" | "picnic" | "stargazing"
  ): Array<{ time: string; value: number }> {
    return hourlyData
      .slice(0, 24)
      .filter((_, i) => i % 2 === 0)
      .map((hour) => {
        const time = new Date(hour.dt * 1000);
        const timeLabel = time.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        const temp = hour.temp;
        const humidity = hour.humidity;
        const pop = hour.pop;
        const clouds = hour.clouds;
        const uvi = hour.uvi;
        const wind = hour.wind_speed;
        const aqi = hour.aqi?.value || 1;

        let score = 0;

        if (type === "picnic") {
          const hourOfDay = time.getHours();
          const isDaytime = hourOfDay >= 6 && hourOfDay <= 18;
          if (isDaytime) {
            if (temp >= 18 && temp <= 28) score++;
            if (humidity < 60) score++;
            if (pop < 0.2) score++;
            if (clouds < 40) score++;
            if (uvi < 6) score++;
            if (wind < 5) score++;
            if (aqi <= 2) score++;
          }
          score = Math.min(5, (score / 7) * 5);
        }

        if (type === "hiking") {
          const hourOfDay = time.getHours();
          const isDaytime = hourOfDay >= 6 && hourOfDay <= 18;
          if (isDaytime) {
            if (temp >= 10 && temp <= 25) score++;
            if (pop < 0.1) score++;
            if (uvi < 6) score++;
            if (wind < 6) score++;
            if (aqi <= 2) score++;
          }
          score = Math.min(5, score);
        }

        if (type === "running") {
          const hourOfDay = time.getHours();
          const isDaytime = hourOfDay >= 6 && hourOfDay <= 18;
          if (isDaytime) {
            if (temp >= 10 && temp <= 25) score++;
            if (pop < 0.1) score++;
            if (uvi < 6) score++;
            if (wind < 6) score++;
            if (aqi <= 2) score++;
          }
          score = Math.min(5, score);
        }

        if (type === "stargazing") {
          const hourOfDay = time.getHours();
          const isNight = hourOfDay >= 20 || hourOfDay <= 4;

          if (isNight) {
            if (temp >= 5 && temp <= 20) score++;
            if (humidity < 80) score++;
            if (pop < 0.1) score++;
            if (clouds < 20) score++;
            if (aqi <= 2) score++;
          }
          score = Math.min(5, score);
        }

        return {
          time: timeLabel,
          value: score,
        };
      });
  }

  useEffect(() => {
    if (weather?.hourly) {
      const fetchRecommendation = async () => {
        try {
          const updatedData = processChartData(
            weather.hourly.map((hour: HourlyWeatherData) => ({
              dt: hour.dt,
              temp: hour.temp,
              humidity: hour.humidity,
              pop: hour.pop ?? 0,
              clouds: hour.clouds,
              uvi: hour.uvi,
              wind_speed: hour.wind_speed,
              aqi:
                typeof hour.aqi === "number" ? { value: hour.aqi } : undefined,
            })),
            weatherType
          );
          setChartData(updatedData);

          const response = await fetch("api/recommendation", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ weatherType, chartData: updatedData }),
          });

          const data = await response.json();

          if (data?.title && data?.description) {
            setRecommendation(data);
          } else {
            setRecommendation({
              title: "Recommendation not available",
              description: "We couldn't generate a summary at this time.",
            });
          }
        } catch {
          setRecommendation({
            title: "Error generating recommendation",
            description: "Please try again later.",
          });
        } finally {
          console.log("Recommendation fetched successfully");
        }
      };

      fetchRecommendation();
    }
  }, [weather, weatherType]);

  const getChartAndRecommendation = async (
    type: ActivityType
  ): Promise<{
    chartData: ChartDataItem[];
    recommendation: { title: string; description: string };
  }> => {
    const hourly = weather?.hourly ?? [];

    const processedData = processChartData(
      hourly.map((hour: HourlyWeatherData) => ({
        dt: hour.dt,
        temp: hour.temp,
        feels_like: hour.feels_like,
        humidity: hour.humidity,
        pop: hour.pop ?? 0,
        clouds: hour.clouds,
        uvi: hour.uvi,
        wind_speed: hour.wind_speed,
        aqi: typeof hour.aqi === "number" ? { value: hour.aqi } : undefined,
      })),
      type
    );

    try {
      const response = await fetch("/api/recommendation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ weatherType: type, chartData: processedData }),
      });

      const data = await response.json();

      return {
        chartData: processedData,
        recommendation: {
          title: data?.title ?? "No title",
          description: data?.description ?? "No description",
        },
      };
    } catch (error) {
      return {
        chartData: processedData,
        recommendation: {
          title: "Error fetching recommendation",
          description: "Try again later",
        },
      };
    }
  };

  useEffect(() => {
    const fetchAll = async () => {
      if (!weather?.hourly || !isMobile) return;

      const results = await Promise.all(
        activityCardData.map(async (card) => {
          const type = card.text as ActivityType;
          const { chartData, recommendation } = await getChartAndRecommendation(
            type
          );

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
    <div className="w-full flex flex-col md:flex-row gap-4 items-start">
      {!isMobile && (
        <>
          <div className="w-full flex flex-col items-start md:max-w-[262px] gap-[15px]">
            {activityCardData.map((card, index) => (
              <ActivityCard
                check={weatherType}
                key={index}
                imgSrc={card.imgSrc}
                text={card.text}
                onClick={() => setWeatherType(card.text as typeof weatherType)}
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

      {isMobile ? (
        mobileCards.map((card, i) => (
          <MobileGraphCard
            key={i}
            activityType={card.activityType}
            isActive={isActive === card.activityType}
            onClick={() => setActive(card.activityType)}
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
        ))
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-white/30 backdrop-blur-sm rounded-lg">
          <div className="w-12 h-12 border-4 border-grey-400 border-solid border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default Activities;
