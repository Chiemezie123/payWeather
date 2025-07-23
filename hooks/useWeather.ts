'use client';
import { useEffect, useState } from "react";
import { getWeatherByLatLon } from "@/features/weather/weatherService";

interface WeatherData {
  current: {
    temp: number;
    weather: { description: string; icon: string }[];
    humidity: number;
    wind_speed: number;
    uvi: number;
    clouds: number;
    pressure: number;
    visibility: number;
  };

  hourly: {
    dt: number;
    temp: number;
    feels_like?: number;
    weather: {
      description: string;
      icon: string;
    }[];
    humidity: number;
    wind_speed: number;
    uvi: number;
    clouds: number;
    pressure: number;
    visibility: number;
  }[];

  daily: {
    dt: number;
    temp: {
      day: number;
      min: number;
      max: number;
      night: number;
      eve: number;
      morn: number;
    };
    weather: {
      description: string;
      icon: string;
    }[];
    humidity: number;
    wind_speed: number;
    uvi: number;
    clouds: number;
  }[];
}

export const useWeather = (lat: number, lon: number) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getWeatherByLatLon(lat, lon);
      
      setWeather(data);
    } catch (err) {
      setError("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, [lat, lon]);

  return { weather, loading, error };
};
