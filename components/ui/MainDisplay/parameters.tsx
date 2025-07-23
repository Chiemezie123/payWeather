import WeatherParameterCard from "@/components/card/weatherParameterCard";
import Wind from "@/assets/svg/wind.svg";
import Drop from "@/assets/svg/drop.svg";
import Cloud from "@/assets/svg/cloud-fog.svg";
import Gauge from "@/assets/svg/wind-2.svg";
import { LAT, LON } from "@/constants/option";
import { useWeather } from "@/hooks/useWeather";

const Parameters = () => {
  const {  weather } = useWeather(LAT, LON);

  const parameters = [
    {
      key: "Pressure",
      value: weather?.current?.pressure
        ? `${weather.current.pressure} hPa`
        : "--",
      icon: <Gauge />,
    },
    {
      key: "Wind Speed",
      value: weather?.current?.wind_speed
        ? `${weather.current.wind_speed} m/s`
        : "--",
      icon: <Wind />,
    },
    {
      key: "Humidity",
      value: weather?.current?.humidity ? `${weather.current.humidity}%` : "--",
      icon: <Drop />,
    },
    {
      key: "Visibility",
      value: weather?.current?.visibility
        ? `${weather.current.visibility / 1000} km`
        : "--",
      icon: <Cloud />,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:flex lg:items-center w-full gap-4">
      {parameters.map((param, i) => (
        <WeatherParameterCard
          key={i}
          parameter={param.key}
          percentage={param.value}
          icon={param.icon}
        />
      ))}
    </div>
  );
};

export default Parameters;
