import React, { useState } from "react";
import { ReactComponent as ApplicationsIcon } from '../icons/applications.svg';
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useNavigate } from "react-router-dom";
import { isEmpty } from '../helper';

// "Suggested Solution" Page Component
function SuggestedSolution({jsondata}) {
    const navigate = useNavigate();
  
    return (
      <div className="flex items-center justify-center">
      <div className="w-full max-w-4xl p-8">
      <div className="container mx-auto">
        <div className="flex space-x-4">
          <button style={{ display: 'flex', justifyContent: 'flex-end' }}
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-indigo-500 text-white rounded shadow hover:bg-indigo-600"
          >
            Data Visualization
          </button>
          <button style={{ display: 'flex', justifyContent: 'flex-end' }}
            onClick={() => navigate("/suggested-solution")}
            className="px-4 py-2 bg-teal-500 text-white rounded shadow hover:bg-teal-600"
          >
            Suggested Solution
          </button>
        </div>

    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
    <h1 style={{ fontSize: "32px", fontWeight: "bold" }}>Recommended Steps</h1>

      {/* Step 1 */}
      <div style={{ marginBottom: "40px" }}>
        <h2 style={{ fontSize: "24px" }}>1. Check Application which run on an affected Systems</h2>
        <Step1 jsondata={jsondata} />

        <div style={{ display: "flex", alignItems: "center", margin: "20px 0" }}>
          <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
            <li>Talk with the IT-Teams of the Applications</li>
            <li>Check if they depend on Docker</li>
            <li>
              If not, scan the app for contamination and move it to a secure
              system
            </li>
          </ul>
        </div>
      </div>

      {/* Step 2 */}
      <div>
        <h2 style={{ fontSize: "24px"}}>2. Check Systems which are offline</h2>
        <Step2 jsondata={jsondata} />
        <br/>
        </div>
          <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
            <li>Talk with the IT-Teams of the Applications</li>
            <li>Check if they depend on Docker</li>
            <li>
              If not, scan the app for contamination and move it to a secure
              system
            </li>
          </ul>
        </div>
      </div>
    </div>

      </div>
    );
  }
  
function Step1({jsondata}) {
  if(isEmpty(jsondata))
    return <></>

  const data = [
    { label: "Directly Affected Applications", value: jsondata.directAffectedApplicationsCount, icon: <ApplicationsIcon className="h-6 w-6 text-red-500" /> },
  ];

  return (
    <div>
      <div className="flex items-center space-x-2">
</div>
    <br/>
    <div className="flex gap-6 mb-8" style={{ width: "300px" }}>
      {data.map((item) => (
        <div key={item.label} className="flex-1 bg-gray-100 p-4 rounded shadow flex flex-col justify-center items-center" style={{ width: "200px" }}>
          <div className="flex justify-center mb-2">
            {item.icon}
          </div>
            <h2 className="text-xl font-semibold">{item.value}</h2>
          <p>{item.label}</p>
        </div>
      ))}
    </div>
    </div>
  );
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];


const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, value }) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);

      return (
          <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
              {/* {`${(percent * 100).toFixed(0)}%`} */}
              {value}
          </text>
      );
  };


const renderPieChart = (data) => (
  <PieChart width={200} height={270} className="mb-20">
    <Pie
      data={data}
      cx={100}
      cy={100}
      innerRadius={50}
      outerRadius={80}
      fill="#8884d8"
      paddingAngle={0}
      labelLine={false}
      label={renderCustomizedLabel}
      dataKey="value"
    >
      {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} display={true}>
        </Cell>
      ))}
    </Pie>
    <Tooltip />
    <Legend layout="vertical" verticalAlign="bottom" align="bottom"  />
  </PieChart>
);


function Step2({jsondata}) {
  if(isEmpty(jsondata))
    return <></>;

  const data = Object.entries(jsondata.systemCountPerNetworkStatus).map(([name, value]) => ({  name, value }));

  return (
    <div className="flex flex-col">
          {renderPieChart(data, 200)}
          <p className="mt-[-70px] text-lg" style={{marginLeft: '7%'}}>Network Status</p>
        </div>
  );
}

  export default SuggestedSolution;