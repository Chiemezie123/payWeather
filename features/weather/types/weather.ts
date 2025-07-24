// /types/weather.ts

import { WeatherCategory } from "@/components/card/weatherChart";
import { calculateDressingIndex, calculateOutdoorScore, processHeatStrokeRisk, vehicleMovementScore } from "../weatherUtils";
import { ActivityType } from "@/constants/option";

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

export type ChartDataItem =
  | { time: string; value: number } // for general score chart
  | { time: string; precipitation: number }
  | { time: string; temperature: number }
  | { time: string; uvi: number }
  | { time: string; feels_like: number }
  | { time: string };

export type Recommendation = {
  title: string;
  description: string;
};

export type WeatherType = "hiking" | "running" | "picnic" | "stargazing";







export const processChartDataHealth = (
  hourlyData: HourlyWeatherData[],
  type: WeatherCategory
): ChartDataItem[] => {
  const processed = hourlyData.map((hour) => ({
    dt: hour.dt,
    temp: hour.temp,
    humidity: hour.humidity,
    pop: hour.pop ?? 0,
    clouds: hour.clouds,
    uvi: hour.uvi,
    wind_speed: hour.wind_speed,
    feels_like: hour.feels_like,
    aqi: typeof hour.aqi === "number" ? { value: hour.aqi } : undefined,
  }));

  return processed
    .slice(0, 24)
    .filter((_, i) => i % 2 === 0)
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
          return { time, score: calculateDressingIndex(hour) ?? 0 };
        case "vehicle":
          return { time, score: vehicleMovementScore(hour) ?? 0 };
        case "uvindex":
          return { time, uvi: hour.uvi ?? 0 };
        case "heatstroke":
          return {
            time,
            feels_like: processHeatStrokeRisk(hour.feels_like ?? 0),
          };
        default:
          return { time };
      }
    });
};




export function processChartData(
  hourlyData: Array<ProcessedChartData>,
  type: WeatherType
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

      const { temp, humidity, pop, clouds, uvi, wind_speed: wind, aqi } = hour;
      let score = 0;

      const hourOfDay = time.getHours();
      const isDaytime = hourOfDay >= 6 && hourOfDay <= 18;
      const isNight = hourOfDay >= 20 || hourOfDay <= 4;
      const safeAQI = aqi?.value ?? 1;

      switch (type) {
        case "picnic":
          if (isDaytime) {
            if (temp >= 18 && temp <= 28) score++;
            if (humidity < 60) score++;
            if (pop < 0.2) score++;
            if (clouds < 40) score++;
            if (uvi < 6) score++;
            if (wind < 5) score++;
            if (safeAQI <= 2) score++;
          }
          score = Math.min(5, (score / 7) * 5);
          break;
        case "hiking":
        case "running":
          if (isDaytime) {
            if (temp >= 10 && temp <= 25) score++;
            if (pop < 0.1) score++;
            if (uvi < 6) score++;
            if (wind < 6) score++;
            if (safeAQI <= 2) score++;
          }
          score = Math.min(5, score);
          break;
        case "stargazing":
          if (isNight) {
            if (temp >= 5 && temp <= 20) score++;
            if (humidity < 80) score++;
            if (pop < 0.1) score++;
            if (clouds < 20) score++;
            if (safeAQI <= 2) score++;
          }
          score = Math.min(5, score);
          break;
      }

      return {
        time: timeLabel,
        value: score,
      };
    });
}



export function processChartDataActivity(
  hourlyData: HourlyWeatherData[],
  type: WeatherType
) {
  const processed: ProcessedChartData[] = hourlyData.map((hour) => ({
    dt: hour.dt,
    temp: hour.temp ?? 0,
    humidity: hour.humidity ?? 0,
    pop: hour.pop ?? 0,
    clouds: hour.clouds ?? 0,
    uvi: hour.uvi ?? 0,
    wind_speed: hour.wind_speed ?? 0,
    aqi: typeof hour.aqi === "number"
      ? { value: hour.aqi }
      : hour.aqi ?? { value: 1 },
  }));

  return processChartData(processed, type);
}