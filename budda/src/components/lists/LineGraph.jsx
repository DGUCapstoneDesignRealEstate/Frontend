import React, { useState, useEffect } from "react";
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
import { useDetailContext } from "../../context/DetailContext";
import axios from "../../axios";

// CustomDot 컴포넌트 정의
const CustomDot = ({ cx, payload, yScale }) => {
  // real이 배열이면 그 배열의 모든 값을 파란 점으로 표시
  if (Array.isArray(payload.real)) {
    return payload.real.map((value, index) => {
      const cy = yScale(value); // Y축 스케일에 따라 y 좌표 계산
      return <circle key={index} cx={cx} cy={cy} r={3} fill="blue" />;
    });
  }
  // real이 단일 값이면 해당 값을 파란 점으로 표시
  if (payload.real !== null && payload.real !== undefined) {
    const cy = yScale(payload.real);
    return <circle cx={cx} cy={cy} r={3} fill="blue" />;
  }
  return null; // real 값이 없으면 점을 표시하지 않음
};

export default function LineGraph() {
  const { dataId } = useDetailContext();
  const [realData, setRealData] = useState(null);
  const [predictData, setPredictData] = useState(null);

  useEffect(() => {
    fetchGraphData();
  }, []);

  const fetchGraphData = async () => {
    try {
      const response = await axios.get(
        `apartment-transactions/${dataId}/graph`
      );
      console.log(response.data);
      setRealData(response.data.realData.realData);
      setPredictData(response.data.predictData.predictData);
    } catch (error) {
      console.error("Error fetching graph data:", error);
    }
  };

  const processData = () => {
    const processedData = [];

    // predictData는 항상 존재하며, 이를 기준으로 그래프를 그려야 한다
    if (predictData) {
      const predictEntries = Object.entries(predictData);

      // predictData를 기준으로 데이터를 처리
      predictEntries.forEach(([yearMonth, predictValue]) => {
        const yearMonthObj = {
          name: yearMonth, // "202104", "202312" 같은 형식
          pred: predictValue,
        };

        // realData가 있을 경우 병합
        if (realData && realData[yearMonth] && realData[yearMonth].length > 0) {
          yearMonthObj.real = realData[yearMonth]; // realData가 배열로 존재하면 그대로 추가
        }

        processedData.push(yearMonthObj);
      });
    }

    return processedData;
  };

  const data = processData();

  const getYDomain = (data) => {
    let min = Infinity;
    let max = 0;

    data.forEach((item) => {
      if (item.pred !== null && item.pred !== undefined) {
        min = Math.min(min, item.pred);
        max = Math.max(max, item.pred);
      }
      if (item.real !== null && item.real !== undefined) {
        if (Array.isArray(item.real)) {
          item.real.forEach((value) => {
            min = Math.min(min, value);
            max = Math.max(max, value);
          });
        } else {
          min = Math.min(min, item.real);
          max = Math.max(max, item.real);
        }
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
            type="category"
            tickFormatter={(timestamp) => {
              const yearMonth = timestamp.toString();
              return `${yearMonth.slice(0, 4)}-${yearMonth.slice(4, 6)}`;
            }}
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
          <Tooltip />
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
