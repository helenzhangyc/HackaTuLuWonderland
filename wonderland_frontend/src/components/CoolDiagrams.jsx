import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { ReactComponent as CoolDiagramsIcon } from '../icons/cool_diagrams.svg';

const data = [
  { name: "Apple", value: 25 },
  { name: "Samsung", value: 40 },
  { name: "Nokia", value: 20 },
  { name: "Sony", value: 15 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const CoolDiagrams = () => {
  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        cx={200}
        cy={200}
        innerRadius={70}
        outerRadius={120}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
};

export default CoolDiagrams;
