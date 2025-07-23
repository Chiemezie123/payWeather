"use client";
import ActivityCard from "@/components/card/activityCard";
import Graphcard from "@/components/card/graphcard";
import { healthCardData, LAT, LON } from "@/constants/option";
import {
  calculateOutdoorScore,
  vehicleMovementScore,
} from "@/features/weather/weatherUtils";
import { useWeather } from "@/hooks/useWeather";
import { useEffect, useState } from "react";
import umbrella from "@/assets/images/Umbrella.png";
import outdoor from "@/assets/images/Beach With Umbrella.png";
import uv from "@/assets/images/Sun.png";
import drive from "@/assets/images/Sport Utility Vehicle.png";
import clothing from "@/assets/images/T Shirt.png";
import heat from "@/assets/images/Thermometer.png";
import type { HourlyWeatherData, ProcessedChartData } from "./activities";

const HealthSafety = () => {
  const { weather } = useWeather(LAT, LON);

  const [weatherType, setWeatherType] = useState<
    "outdoor" | "umbrella" | "clothing" | "vehicle" | "heatstroke" | "uvindex"
  >("umbrella");

  const [recommendation, setRecommendation] = useState({
    title: "Loading...",
    description: "Please wait while we generate a summary.",
  });

  type ChartDataItem =
    | {
        time: string;
        score: number;
        precipitation?: undefined;
        temperature?: undefined;
        uvi?: undefined;
      }
    | {
        time: string;
        precipitation: number;
        score?: undefined;
        temperature?: undefined;
        uvi?: undefined;
      }
    | {
        time: string;
        temperature: number;
        precipitation: number;
        score?: undefined;
        uvi?: undefined;
      }
    | {
        time: string;
        score: number;
        precipitation?: undefined;
        temperature?: undefined;
        uvi?: undefined;
      }
    | {
        time: string;
        uvi: number;
        score?: undefined;
        precipitation?: undefined;
        temperature?: undefined;
      }
    | { time: string };

  const [chartData, setChartData] = useState<ChartDataItem[]>([]);

  const selectImage = [
    {
      name: "umbrella",
      imgSrc: umbrella,
    },
    {
      name: "outdoor",
      imgSrc: outdoor,
    },
    {
      name: "clothing",
      imgSrc: clothing,
    },
    {
      name: "vehicle",
      imgSrc: drive,
    },
    {
      name: "uvindex",
      imgSrc: uv,
    },
    {
      name: "heatstroke",
      imgSrc: heat,
    },
  ];

  function processChartData(
    hourlyData: Array<ProcessedChartData>,
    type:
      | "outdoor"
      | "umbrella"
      | "clothing"
      | "vehicle"
      | "uvindex"
      | "heatstroke"
  ) {
    return hourlyData
      .filter((_, i) => i % 3 === 0)
      .map((hour) => {
        const time = new Date(hour.dt * 1000).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        switch (type) {
          case "outdoor":
            return { time, score: calculateOutdoorScore(hour) ?? 0 };
          case "umbrella":
            return { time, precipitation: (hour.pop ?? 0) * 100 };
          case "clothing":
            return {
              time,
              temperature: hour.temp ?? 0,
              precipitation: (hour.pop ?? 0) * 100,
            };
          case "vehicle":
            return {
              time,
              score: vehicleMovementScore(hour) ?? 0,
            };
          case "uvindex":
            return {
              time,
              uvi: hour.uvi ?? 0,
            };
          default:
            return { time };
        }
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

          const response = await fetch("/api/recommendation", {
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

  return (
    <div className="w-full flex gap-4 items-start">
      <div className="w-full flex flex-col items-start max-w-[262px] gap-[15px]">
        {healthCardData.map((card, index) => (
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
              ? { chartData, category: weatherType }
              : undefined
          }
          imgSrc={
            selectImage.find((item) => item.name === weatherType)?.imgSrc || ""
          }
        />
      </div>
    </div>
  );
};

export default HealthSafety;
