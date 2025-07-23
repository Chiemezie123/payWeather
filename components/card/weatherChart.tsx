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
  if (score >= 0 && score <= 20) return "Very Poor";
  if (score >= 20 && score <= 40) return "Poor";
  if (score >= 40 && score <= 60) return "Normal";
  if (score >= 60 && score <= 80) return "Very Good";
  return "Excellent";
};

const getScoreActivity = (score: number) => {
  if (score >= 0 && score <= 1) return "Poor";
  if (score >= 1 && score <= 2) return "good";
  if (score >= 2 && score <= 3) return "better";
  if (score >= 3 && score <= 4) return "Excellent";
  return "Excellent";
};

const getScoreLabelForOutdoor = (score: number) => {
  if (score >= 0 && score <= 20) return "Very Poor";
  if (score >= 20 && score <= 40) return "Poor";
  if (score >= 40 && score <= 60) return "Normal";
  if (score >= 60 && score <= 80) return "Very Good";
  return "Excellent";
};

const getScoreUmbrella = (score: number) => {
  if (score >= 0 && score <= 20) return "no rain";
  if (score >= 20 && score <= 40) return "Light Rain";
  if (score >= 40 && score <= 60) return "Moderate Rain";
  if (score >= 60 && score <= 80) return "Heavy Rain";
  return "Rainstorm";
};

const getUvIndexCategory = (uvi: number): string => {
  if (uvi >= 0 && uvi <= 3) return "Low UV";
  if (uvi >= 3 && uvi <= 6) return "Mod UV";
  if (uvi >= 6 && uvi <= 8) return "High UV";
  if (uvi >= 8 && uvi <= 11) return "V High UV";
  return "Extreme UV";
};

const getScoreHeatStroke = (score: number) => {
  if (score >= 0 && score <= 1) return "Safe";
  if (score >= 2 && score <= 3) return "Mild";
  if (score >= 3 && score <= 4) return "Caution";
  if (score >= 4 && score <= 5) return "High";
  return "Danger";
};

const getScoreClothing = (score: number) => {
  if (score >= 0 && score <= 1) return "Light Wear";
  if (score >= 2 && score <= 3) return "Light Casual";
  if (score >= 3 && score <= 4) return "Mild Layering";
  if (score >= 4 && score <= 5) return "Jacket Weather";
  return "Heavy Wear";
};

const getToolTipClothing = (value: number) => {
  if (value >= 0 && value <= 1)
    return "eg:Sleeveless tops, shorts, very breathable fabrics";
  if (value >= 2 && value <= 3) return "eg:T-shirt, light pants/skirts";
  if (value >= 3 && value <= 4) return "eg:Shirt & jeans, light jacket";
  if (value >= 4 && value <= 5)
    return "eg:Long sleeves, hoodie or light sweater";
  return "eg:Coat, thermal layers, gloves, hat";
};

export type WeatherChartProps = {
  chartData: ChartDataPoint[];
  category?: WeatherCategory;
  activity?: ActivityType;
};

const WeatherChart = ({ chartData, category, activity }: WeatherChartProps) => {
  const isActivity = Boolean(activity);

  const formatYAxisTick = (value: number) => {
    if (isActivity) return getScoreActivity(value);
    if (category === "umbrella") return getScoreUmbrella(value);
    if (category === "outdoor") return getScoreLabelForOutdoor(value);
    if (category === "heatstroke") return getScoreHeatStroke(value);
    if (category === "clothing") return getScoreClothing(value);
    if (["vehicle"].includes(category ?? "")) return getScoreLabel(value);

    if (category === "uvindex") return getUvIndexCategory(value);
    return value.toString();
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;
      const description = isActivity
        ? getScoreActivity(value)
        : category === "umbrella"
        ? getScoreUmbrella(value)
        : category === "outdoor"
        ? getScoreLabelForOutdoor(value)
        : ["vehicle"].includes(category ?? "")
        ? getScoreLabel(value)
        : category === "uvindex"
        ? getUvIndexCategory(value)
        : category === "heatstroke"
        ? getScoreHeatStroke(value)
        : category === "clothing"
        ? getToolTipClothing(value)
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
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="time" tick={{ fontSize: 12 }} />

        {isActivity ? (
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
            domain={[0, 5]}
            ticks={[0, 1, 2, 3, 4, 5]}
            tickFormatter={formatYAxisTick}
          />
        ) : (
          <YAxis
            axisLine={false}
            tickLine={false}
            type={
              ["outdoor", "umbrella", "vehicle"].includes(category ?? "")
                ? "number"
                : undefined
            }
            domain={
              ["outdoor", "vehicle", "umbrella"].includes(category ?? "")
                ? [0, 100]
                : category === "uvindex"
                ? [0, 11]
                : category === "heatstroke" || category === "clothing"
                ? [0, 5]
                : undefined
            }
            ticks={
              ["outdoor", "umbrella", "vehicle"].includes(category ?? "")
                ? [0, 20, 40, 60, 80, 100]
                : category === "uvindex"
                ? [0, 2, 4, 6, 8, 10]
                : category === "heatstroke" || category === "clothing"
                ? [0, 1, 2, 3, 4, 5]
                : undefined
            }
            tickFormatter={formatYAxisTick}
            tick={{ fontSize: 12 }}
          />
        )}

        <Tooltip content={<CustomTooltip />} />

        {/* 🟣 Render activity or category bars */}
        {isActivity && <Bar dataKey="value" fill="#a78bfa" />}

        {!isActivity && category === "outdoor" && (
          <Bar dataKey="score" fill="#a78bfa" />
        )}

        {category === "umbrella" && (
          <Bar dataKey="precipitation" fill="#60a5fa" />
        )}
        {category === "clothing" && (
          <>
            <Bar dataKey="score" fill="#60a5fa" />
          </>
        )}
        {category === "vehicle" && <Bar dataKey="score" fill="#a78bfa" />}
        {category === "uvindex" && <Bar dataKey="uvi" fill="#4ade80" />}
        {category === "heatstroke" && (
          <Bar dataKey="feels_like" fill="#4ade80" />
        )}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default WeatherChart;
