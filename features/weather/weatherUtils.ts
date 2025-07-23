import { WeatherCategory } from "@/components/card/weatherChart";
import { ChartDataItem } from "@/components/ui/MainDisplay/healthSafety";

interface SummaryResponse {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
}

interface WeatherData {
  temperature: number;
  weather: string;
  humidity: number;
  windspeed: number;
  uvIndex: number;
  Cloudiness: number;
}

interface HourlyWeatherData {
  temp: number;
  uvi: number;
  pop: number;
  wind_speed: number;
  humidity: number;
}

interface HourlyWeatherData {
  temp: number;
  uvi: number;
  pop: number;
  wind_speed: number;
  humidity: number;
}

export const getSuggestion = (temp: number, condition: string) => {
  const lowerCondition = condition.toLowerCase();
  if (lowerCondition.includes("rain")) return "Take an umbrella 🌧️";
  if (temp > 30) return "Stay hydrated 🥤 and wear light clothing";
  if (temp < 15) return "Wear a jacket 🧥";
  return "You're good to go! 😎";
};

export async function getSummary(weatherData: WeatherData): Promise<string> {
  try {
    const response = await fetch("/api/summary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ weatherData }),
    });

    const data: SummaryResponse = await response.json();

    const message = data.choices?.[0]?.message?.content;
    return message || "No summary available";
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return "Sorry, something went wrong.";
  }
}

export function toPercentage(value: number, total: number) {
  if (total === 0) return "0%";
  const percentage = (value / total) * 100;
  return `${Math.ceil(percentage)}%`;
}

export function calculateOutdoorScore(hour: HourlyWeatherData): number {
  const temp = hour.temp;
  const uvi = hour.uvi;
  const precipitation = hour.pop * 100;
  const wind = hour.wind_speed;
  const humidity = hour.humidity;

  if (precipitation > 80) return 10;

  let score = 100;

  if (temp < 15 || temp > 30) {
    score -= 20;
  } else if ((temp >= 15 && temp < 20) || (temp > 25 && temp <= 30)) {
    score -= 10;
  }

  if (uvi > 8) {
    score -= 20;
  } else if (uvi > 5) {
    score -= 10;
  }

  if (precipitation > 50) {
    score -= 30;
  } else if (precipitation > 30) {
    score -= 20;
  } else if (precipitation > 10) {
    score -= 10;
  }

  if (wind > 20) {
    score -= 20;
  } else if (wind > 10) {
    score -= 10;
  }

  if (humidity < 30 || humidity > 80) {
    score -= 10;
  }

  return Math.max(0, Math.min(100, score));
}

export function vehicleMovementScore(hour: {
  visibility?: number;
  wind_speed?: number;
  pop?: number;
}): number {
  let score = 100;

  const visibility = hour.visibility ?? 0;
  const wind = hour.wind_speed ?? 0;
  const precip = hour.pop ?? 0;

  if (visibility < 2000) {
    score -= 60;
  } else if (visibility < 6000) {
    score -= 10;
  }

  if (wind > 14) {
    score -= 20;
  } else if (wind > 8) {
    score -= 10;
  }

  if (precip > 70 || precip > 0.7) {
    score -= 70;
  } else if (precip > 10 || precip > 0.2) {
    score -= 20;
  } else if (precip > 2 || precip > 0.05) {
    score -= 10;
  }

  return Math.max(0, Math.min(100, score));
}

export function processHeatStrokeRisk(feelsLike: number): number {
  if (feelsLike < 27) return 0;
  if (feelsLike < 31) return 1;
  if (feelsLike < 35) return 2;
  if (feelsLike < 39) return 3;
  if (feelsLike < 43) return 4;
  return 5;
}


export function calculateDressingIndex(hour: HourlyWeatherData): number {
  let score = 0;

  // Temperature effect
  score += 5 - Math.min(hour.temp, 40) / 10;

  // Precipitation (chance of rain)
  score += (hour.pop ?? 0) * 2;

  // Wind (more wind = dress warmer)
  score += Math.min(hour.wind_speed ?? 0, 20) / 5;

  // Humidity (humid = dress lighter)
  score -= Math.min(hour.humidity ?? 0, 100) / 50;

  // Clamp score between 0 and 5
  return Math.max(0, Math.min(5, parseFloat(score.toFixed(2))));
}



