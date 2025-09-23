import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type MonthlyData = {
  month: string;
  revenue: number;
  fullMonth: string;
};

interface MonthlyRevenueChartProps {
  monthlyData: MonthlyData[];
  onBarClick?: (index: number) => void;
}

const MonthlyRevenueChart: React.FC<MonthlyRevenueChartProps> = ({
  monthlyData,
  onBarClick,
}) => {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload as MonthlyData;
      return (
        <div className="bg-white border border-blue-200 rounded-lg shadow-lg p-3">
          <p className="font-semibold text-blue-900">{data.fullMonth}</p>
          <p className="text-blue-700">
            Revenue:{" "}
            <span className="font-bold">
              ${payload[0].value.toLocaleString()}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  // Format currency for Y-axis
  const formatCurrency = (value: number) => {
    return `$${(value / 1000).toFixed(0)}k`;
  };

  return (
    <div className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={monthlyData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          role="img"
          aria-label="Monthly revenue bar chart showing 12 months of financial data"
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e6f3ff" opacity={0.7} />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#1e40af", fontSize: 12, fontWeight: 500 }}
            aria-label="Months"
          />
          <YAxis
            tickFormatter={formatCurrency}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#1e40af", fontSize: 12 }}
            aria-label="Revenue in thousands of dollars"
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "#dbeafe", opacity: 0.3 }}
          />
          <Bar
            dataKey="revenue"
            fill="#3b82f6"
            radius={[4, 4, 0, 0]}
            stroke="#2563eb"
            strokeWidth={1}
            aria-label="Monthly revenue bars"
            onClick={(data, index) => {
              if (onBarClick) {
                onBarClick(index);
              }
            }}
          />
        </BarChart>
      </ResponsiveContainer>

      {/* Screen reader accessible data summary */}
      <div className="sr-only" aria-live="polite">
        Monthly revenue data:
        {monthlyData.map((item, index) => (
          <span key={index}>
            {item.fullMonth}: ${item.revenue.toLocaleString()}.
          </span>
        ))}
      </div>
    </div>
  );
};

export default MonthlyRevenueChart;
