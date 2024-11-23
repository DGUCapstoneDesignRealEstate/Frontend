import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./LineGraph.css";

// Date를 timestamp로 변환하여 비율 조정
const data = [
  { name: new Date("2023-11-15").getTime(), real: null, pred: 43088 },
  {
    name: new Date("2023-12-15").getTime(),
    real: [45000, 40000],
    pred: 42788,
  },
  { name: new Date("2024-01-15").getTime(), real: null, pred: 42210 },
  { name: new Date("2024-02-15").getTime(), real: 43000, pred: 42130 },
  {
    name: new Date("2024-03-15").getTime(),
    real: [40000, 42000],
    pred: 41800,
  },
  { name: new Date("2024-04-15").getTime(), real: 41000, pred: 41860 },
  {
    name: new Date("2024-05-15").getTime(),
    real: [43700, 39000],
    pred: 41430,
  },
  { name: new Date("2024-06-15").getTime(), real: null, pred: 41350 },
  { name: new Date("2024-07-15").getTime(), real: 41000, pred: 41350 },
  { name: new Date("2024-08-15").getTime(), real: null, pred: 41350 },
  { name: new Date("2024-09-15").getTime(), real: null, pred: 41350 },
  { name: new Date("2024-10-15").getTime(), real: null, pred: 41350 },
];

// CustomDot 컴포넌트 정의
const CustomDot = ({ cx, payload, yScale }) => {
  if (Array.isArray(payload.real)) {
    return payload.real.map((value, index) => {
      const cy = yScale(value); // Y축 스케일에 따라 y 좌표 계산
      return <circle key={index} cx={cx} cy={cy} r={3} fill="blue" />;
    });
  }
  return <circle cx={cx} cy={yScale(payload.real)} r={3} fill="blue" />;
};

export default function LineGraph() {
  const getYDomain = (data) => {
    let min = Infinity;
    let max = 0;

    data.forEach((item) => {
      if (item.pred !== null && item.pred !== undefined) {
        min = Math.min(min, item.pred);
        max = Math.max(max, item.pred);
      }
      if (Array.isArray(item.real)) {
        item.real.forEach((value) => {
          min = Math.min(min, value);
          max = Math.max(max, value);
        });
      } else if (item.real !== null && item.real !== undefined) {
        min = Math.min(min, item.real);
        max = Math.max(max, item.real);
      }
    });
    return { min, max };
  };

  const { min, max } = getYDomain(data);

  return (
    <div
      style={{
        width: "100vw",
        height: "40vh",
        minHeight: "200px",
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ right: 40, left: 40 }}
          className="linewrapper"
        >
          <CartesianGrid strokeDasharray="1 1" />
          <XAxis
            dataKey="name"
            type="number"
            domain={["dataMin", "dataMax"]}
            tickFormatter={(timestamp) => {
              const date = new Date(timestamp);
              return `${date.getFullYear()}.${String(
                date.getMonth() + 1
              ).padStart(2, "0")}`;
            }}
            scale="time"
            padding={{ left: 30, right: 30 }}
            label={{
              value: "날짜",
              dx: 6,
              position: "insideBottomLeft",
              offset: -5,
            }}
            tickCount={12}
            interval={0}
          />
          <Tooltip
            cursor={{ stroke: "#A16A00", strokeWidth: 1 }}
            labelFormatter={(label) => new Date(label).toLocaleDateString()}
          />
          <YAxis
            domain={[min - 1000, max + 1000]}
            label={{
              value: "(만 원)",
              angle: -90,
              position: "insideMiddle",
              dx: -32,
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="pred"
            stroke="red"
            dot={{ fill: "red" }}
            activeDot={{ fill: "#BE7C00" }}
            connectNulls={true}
            strokeDasharray="3 3"
          />
          <Line
            type="monotone"
            dataKey="real"
            stroke="none"
            dot={
              <CustomDot
                yScale={(value) =>
                  0.4 * window.innerHeight -
                  47 -
                  ((value - min + 1000) / (max - min + 2000)) *
                    (0.4 * window.innerHeight - 47)
                }
              />
            }
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
