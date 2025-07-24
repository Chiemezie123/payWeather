import { useRef, useState } from "react";
import { HourlyWeatherData } from "@/features/weather/types/weather";

// ChartDataItem should already be exported elsewhere — if not:
export type ChartDataItem =
  | { time: string; score: number }
  | { time: string; precipitation: number }
  | { time: string; temperature: number; precipitation: number }
  | { time: string; uvi: number }
  | { time: string; feels_like: number }
  | { time: string; value: number }
  | { time: string };

export type ChartProcessor<T extends string> = (
  hourlyData: HourlyWeatherData[],
  type: T
) => ChartDataItem[];

export function useRecommendationData<T extends string>(
  hourly: HourlyWeatherData[] = [],
  processChartData: ChartProcessor<T>
) {
  const cache = useRef<Record<
    T,
    { chartData: ChartDataItem[]; recommendation: { title: string; description: string } }
  >>({} as Record<T, any>);

  const [loading, setLoading] = useState(false);

  const fetchData = async (type: T) => {
    const processed = processChartData(hourly, type);

    try {
      const res = await fetch("/api/recommendation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ weatherType: type, chartData: processed }),
      });

      const data = await res.json();

      return {
        chartData: processed,
        recommendation: {
          title: data?.title ?? "No title",
          description: data?.description ?? "No description",
        },
      };
    } catch (e) {
      return {
        chartData: processed,
        recommendation: {
          title: "Error",
          description: "Try again later.",
        },
      };
    }
  };

  const getData = async (type: T) => {
    if (cache.current[type]) return cache.current[type];

    setLoading(true);
    const result = await fetchData(type);
    cache.current[type] = result;
    setLoading(false);

    return result;
  };

  const prefetchData = (type: T) => {
    if (cache.current[type]) return;
    fetchData(type).then((result) => {
      cache.current[type] = result;
    });
  };

  return {
    getData,
    prefetchData,
    loading,
  };
}
