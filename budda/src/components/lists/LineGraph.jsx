import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import "./LineGraph.css";

// Date를 timestamp로 변환하여 비율 조정
const data = [
  { name: new Date("2023-11-15").getTime(), 실제가: null, 예측가: 43088 },
  {
    name: new Date("2023-12-15").getTime(),
    실제가: [45000, 40000],
    예측가: 42788,
  },
  { name: new Date("2024-01-15").getTime(), 실제가: null, 예측가: 42210 },
  { name: new Date("2024-02-15").getTime(), 실제가: 43000, 예측가: 42130 },
  {
    name: new Date("2024-03-15").getTime(),
    실제가: [40000, 42000],
    예측가: 41800,
  },
  { name: new Date("2024-04-15").getTime(), 실제가: 41000, 예측가: 41860 },
  {
    name: new Date("2024-05-15").getTime(),
    실제가: [43700, 39000],
    예측가: 41430,
  },
  { name: new Date("2024-06-15").getTime(), 실제가: null, 예측가: 41350 },
  { name: new Date("2024-07-15").getTime(), 실제가: 41000, 예측가: 41350 },
  { name: new Date("2024-08-15").getTime(), 실제가: null, 예측가: 41350 },
  { name: new Date("2024-09-15").getTime(), 실제가: null, 예측가: 41350 },
  { name: new Date("2024-10-15").getTime(), 실제가: null, 예측가: 41350 },
];

// CustomDot 컴포넌트 정의
const CustomDot = ({ cx, payload, yScale }) => {
  if (Array.isArray(payload.실제가)) {
    return payload.실제가.map((value, index) => {
      const cy = yScale(value); // Y축 스케일에 따라 y 좌표 계산
      return <circle key={index} cx={cx} cy={cy} r={3} fill="blue" />;
    });
  }
  return <circle cx={cx} cy={yScale(payload.실제가)} r={3} fill="blue" />;
};

export default function LineGraph() {
  return (
    <LineChart
      width={1200}
      height={240}
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
          return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(
            2,
            "0"
          )}`;
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
        domain={["auto", "auto"]}
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
        dataKey="예측가"
        stroke="red"
        dot={{ fill: "red" }}
        activeDot={{ fill: "#BE7C00" }}
        connectNulls={true}
        strokeDasharray="3 3"
      />
      <Line
        type="monotone"
        dataKey="실제가"
        stroke="none"
        dot={
          <CustomDot
            yScale={(value) => 193 - ((value - 39000) / (45000 - 39000)) * 193}
          />
        }
      />
    </LineChart>
  );
}
