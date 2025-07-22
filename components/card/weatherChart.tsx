import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export type WeatherCategory =
  | "outdoor"
  | "umbrella"
  | "clothing"
  | "vehicle"
  | "uvindex"
  | "heatstroke";

export type ActivityType =
  | "hiking"
  | "running"
  | "picnic"
  | "stargazing"
  | "cycling"
  | "gardening";

export type ChartDataPoint = {
  time: string;
  score?: number;
  precipitation?: number;
  temperature?: number;
  visibility?: number;
  wind?: number;
  uvi?: number;
};

const getScoreLabel = (score: number) => {
  if (score >= 0 && score < 1) return "Very Poor";
  if (score >= 1 && score < 2) return "Poor";
  if (score >= 2 && score < 3) return "Normal";
  if (score >= 3 && score < 4) return "Very Good";
  return "Excellent";
};

const getScoreUmbrella = (score: number) => {
  if (score >= 0 && score < 20) return "Drizzling";
  if (score >= 20 && score < 40) return "Light Rain";
  if (score >= 40 && score < 60) return "Moderate Rain";
  if (score >= 60 && score < 80) return "Heavy Rain";
  return "Rainstorm";
};

const getUvIndexCategory = (uvi: number): string => {
  if (uvi >= 0 && uvi < 3) return "Low UV";
  if (uvi >= 3 && uvi < 6) return "Mod UV";
  if (uvi >= 6 && uvi < 8) return "High UV";
  if (uvi >= 8 && uvi < 11) return "V High UV";
  return "Extreme UV";
};

export type WeatherChartProps = {
  chartData: ChartDataPoint[];
  category?: WeatherCategory;
  activity?: ActivityType;
};

const WeatherChart = ({ chartData, category, activity }: WeatherChartProps) => {
  const isActivity = Boolean(activity);

  const formatYAxisTick = (value: number) => {
    if (isActivity) return getScoreLabel(value);
    if (category === "umbrella") return getScoreUmbrella(value);
    if (["outdoor", "vehicle"].includes(category ?? "")) return getScoreLabel(value);
    if (category === "uvindex") return getUvIndexCategory(value);
    return value.toString();
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;
      const description = isActivity
        ? getScoreLabel(value)
        : category === "umbrella"
        ? getScoreUmbrella(value)
        : ["outdoor", "vehicle"].includes(category ?? "")
        ? getScoreLabel(value)
        : category === "uvindex"
        ? getUvIndexCategory(value)
        : value;

      return (
        <div className="bg-white border p-2 rounded shadow">
          <p className="text-sm font-semibold">{label}</p>
          <p className="text-xs">{description}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" tick={{ fontSize: 12 }} />

        <YAxis
          type={
            isActivity || ["outdoor", "umbrella", "vehicle"].includes(category ?? "")
              ? "number"
              : undefined
          }
          domain={
            isActivity
              ? [0, 5]
              : ["outdoor", "vehicle"].includes(category ?? "")
              ? [0, 100]
              : category === "umbrella"
              ? [0, 100]
              : category === "uvindex"
              ? [0, 11]
              : undefined
          }
          ticks={
            isActivity
              ? [0, 1, 2, 3, 4, 5]
              : ["outdoor", "umbrella", "vehicle"].includes(category ?? "")
              ? [0, 20, 40, 60, 80, 100]
              : category === "uvindex"
              ? [0, 2, 4, 6, 8, 10]
              : undefined
          }
          tickFormatter={formatYAxisTick}
          tick={{ fontSize: 12 }}
        />

        <Tooltip content={<CustomTooltip />} />

        {/* 🟣 Render activity or category bars */}
        {isActivity && <Bar dataKey="value" fill="#a78bfa" />}
        {!isActivity && category === "outdoor" && <Bar dataKey="score" fill="#a78bfa" />}
        {category === "umbrella" && <Bar dataKey="precipitation" fill="#60a5fa" />}
        {category === "clothing" && (
          <>
            <Bar dataKey="temperature" fill="#f97316" />
            <Bar dataKey="precipitation" fill="#60a5fa" />
          </>
        )}
        {category === "vehicle" && <Bar dataKey="score" fill="#a78bfa" />}
        {category === "uvindex" && <Bar dataKey="uvi" fill="#4ade80" />}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default WeatherChart;
