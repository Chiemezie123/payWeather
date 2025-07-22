import { useEffect, useState } from "react";
import FutureCard from "@/components/cards/futureCard";
import MainDisplayCard from "@/components/cards/mainDisplayCard";

import image from "@/assets/images/Sun.png";
import { LAT, LON } from "@/constants/option";
import { useWeather } from "@/hooks/useWeather";
import {
  getCurrentTimeFormatted,
  getAbbreviatedDay,
} from "@/features/date/dateUtils";
import { getSummary } from "@/features/weather/weatherUtils";

const WeatherDistribution = () => {
  const { weather} = useWeather(LAT, LON);

  const [summary, setSummary] = useState("");

  useEffect(() => {
    const fetchSummary = async () => {
      if (!weather?.current) return;

      const message = await getSummary({
        temperature: weather.current.temp,
        weather: weather.current.weather[0].description,
        humidity: weather.current.humidity,
        windspeed: weather.current.wind_speed,
        uvIndex: weather.current.uvi,
        Cloudiness: weather.current.clouds,
      });

      setSummary(message);
    };

    fetchSummary();
  }, [weather]);

 

  const current = weather?.current;

  return (
    <div className="w-full xl:h-[250px] flex flex-col xl:flex-row gap-4 items-start">
      <MainDisplayCard
        temperature={current?.temp ? `${Math.round(current.temp)}°` : "N/A"}
        shortDetail={current?.weather[0]?.description || "N/A"}
        shortDescription={summary}
        imgSrc={
          current?.weather[0]?.icon
            ? `http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`
            : image
        }
        time={getCurrentTimeFormatted()}
      />

      <div className="h-full flex items-center gap-4 overflow-x-scroll no-scrollbar">
        {weather?.daily?.slice(1, 7).map((item, i) => (
          <FutureCard
            key={i}
            temperature={`${Math.round(item.temp.day)}°`}
            image={
              item.weather[0].icon
                ? `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
                : ""
            }
            date={getAbbreviatedDay(item.dt)}
          />
        ))}
      </div>
    </div>
  );
};

export default WeatherDistribution;
