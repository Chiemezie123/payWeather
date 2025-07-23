import umbrella from "@/assets/images/Umbrella.png";
import outdoor from "@/assets/images/Beach With Umbrella.png";
import uv from "@/assets/images/Sun.png";
import drive from "@/assets/images/Sport Utility Vehicle.png";
import clothing from "@/assets/images/T Shirt.png";
import heat from "@/assets/images/Thermometer.png";
import Mountain from "@/assets/images/Mountain.png";
import Running from "@/assets//images/Man_Running.png";
import Picnic from "@/assets/images/Umbrella_On_Ground.png";
import Stargazing from "@/assets/images/Shooting_Star.png";


import type { ActivityCardProps } from "@/components/card/activityCard";

export const LAT = 6.5244;
export const LON = 3.3792;

export const healthCardData: ActivityCardProps[] = [
  {
    imgSrc: umbrella,
    text: "umbrella",
    check: "",
    onClick: () => {},
  },

  {
    imgSrc: outdoor,
    text: "outdoor",
    onClick: () => {},
    check: "",
  },

  {
    imgSrc: uv,
    text: "uvindex",
    onClick: () => {},
    check: "",
  },
  {
    imgSrc: drive,
    text: "vehicle",
    onClick: () => {},
    check: "",
  },
  {
    imgSrc: clothing,
    text: "clothing",
    onClick: () => {},
    check: "",
  },
  {
    imgSrc: heat,
    text: "heatstroke",
    onClick: () => {},
    check: "",
  },
];

export const activityCardData: ActivityCardProps[] = [
  {
    imgSrc: Mountain,
    text: "hiking",
    onClick: () => {},
    check: "",
  },

  {
    imgSrc: Running,
    text: "running",
    onClick: () => {},
    check: "",
  },

  {
    imgSrc: Picnic,
    text: "picnic",
    onClick: () => {},
    check: "",
  },
  {
    imgSrc: Stargazing,
    text: "stargazing",
    onClick: () => {},
    check: "",
  },
 
];

export const activityToWeatherMetric = {
  hiking: "outdoor",
  running: "outdoor",
  picnic: "umbrella",
  stargazing: "uvindex",
  cycling: "vehicle",
  gardening: "clothing",
} as const;

export type ActivityType = keyof typeof activityToWeatherMetric;
