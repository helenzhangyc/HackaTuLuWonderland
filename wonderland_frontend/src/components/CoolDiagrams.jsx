import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { ReactComponent as CoolDiagramsIcon } from '../icons/cool_diagrams.svg';
import { useState, useEffect } from "react";
import jsondata from '../jsons/test.json';

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const data1 = Object.entries(jsondata.systemsCountPerCriticalAndConsistency).map(([name, value]) => ({
  name,
  value,
}));
const data2 = Object.entries(jsondata.systemCountPerType).map(([name, value]) => ({  name, value }));
const data3 = Object.entries(jsondata.systemCountPerSubType).map(([name, value]) => ({  name, value }));

console.log(data1);

const renderPieChart = (data) => (
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


const CoolDiagrams = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center space-x-2 self-start">
        <CoolDiagramsIcon className="h-6 w-6 text-gray-500" />
        <b>Cool Diagrams</b>
      </div>
      <div className="flex space-x-4">
        <div className="flex flex-col items-center">
          <div className="flex">
            {renderPieChart(data1)}
          </div>
          <p style={{ marginTop: '-30px', fontSize: '20px' }}>Critical</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex">
            {renderPieChart(data2)}
          </div>
          <p style={{ marginTop: '-30px', fontSize: '20px' }}>Type</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex">
            {renderPieChart(data3)}
          </div>
          <p style={{ marginTop: '-30px', fontSize: '20px' }}>Subtype</p>
        </div>
      </div>
    </div>
  );
};

export default CoolDiagrams;