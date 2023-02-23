import React, { useCallback } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default React.memo(function Chart({ chart }) {
  const renderLegendText = useCallback((value, entry) => {
    const { color } = entry;
    return <span style={{ color, fontSize: 10 }}>{value}</span>;
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={chart}
        margin={{
          top: 5,
          right: 20,
          left: 2,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="5 5" />
        <XAxis fontSize={10} dataKey="date" padding={{ left: 10, right: 10 }} />
        <YAxis
          fontSize={14}
          allowDecimals
          allowDataOverflow
          ticks={[1.3, 1.4, 1.5, 1.6, 1.7]}
          domain={[1.25, 1.75]}
        />
        <Tooltip
          position={{ x: 310, y: -50 }}
          formatter={(val, name, props) => {
            const rename = name.split("[")[0];
            const len = props.payload[rename].count;
            return [`${val}(${len}개)`, rename];
          }}
        />
        <Legend formatter={renderLegendText} />
        <Line
          type="monotone"
          dataKey="수원[fe]"
          stroke="#343a40"
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="양주[fe]"
          stroke="#f03e3e"
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="미래부[fe]"
          stroke="#3bc9db"
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="안양[fe]"
          stroke="#4dabf7"
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="무지개[fe]"
          stroke="#748ffc"
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="사조[fe]"
          stroke="#9775fa"
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="서부[fe]"
          stroke="#364fc7"
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="우성[fe]"
          stroke="#f06595"
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="중앙[fe]"
          stroke="#f06595"
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="천하제일[fe]"
          stroke="#8884d8"
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="카길[fe]"
          stroke="#868e96"
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="퓨리나[fe]"
          stroke="#37b24d"
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="기타[fe]"
          stroke="#0ca678"
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
});
