import {
  getScoreActivity,
  getScoreClothing,
  getScoreHeatStroke,
  getScoreLabel,
  getScoreLabelForOutdoor,
  getScoreUmbrella,
  getToolTipClothing,
  getUvIndexCategory,
} from "@/features/weather/weatherUtils";
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

export type ActivityType = "hiking" | "running" | "picnic" | "stargazing";

export type ChartDataPoint = {
  time: string;
  score?: number;
  precipitation?: number;
  temperature?: number;
  visibility?: number;
  wind?: number;
  uvi?: number;
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
        : category === "vehicle"
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

        {isActivity && <Bar dataKey="value" fill="#a78bfa" />}

        {category === "outdoor" && <Bar dataKey="score" fill="#a78bfa" />}

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
