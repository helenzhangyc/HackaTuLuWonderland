import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { ReactComponent as HouseIcon } from '../icons/house.svg';
import { isEmpty } from "../helper"
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
  <PieChart width={400} height={460} className="mb-20">
    <Pie
      data={data}
      cx={200}
      cy={200}
      innerRadius={70}
      outerRadius={120}
      fill="#8884d8"
      paddingAngle={0}
      labelLine={false}
      label={renderCustomizedLabel}
      dataKey="value"
    >
      {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
    <Tooltip />
    <Legend layout="vertical" verticalAlign="bottom" align="bottom"  />

  </PieChart>
);

const IndirectlyAffected = ({jsondata}) => {
  if(isEmpty(jsondata))
    return <></>;

  const directlyAffectedSystemTypes = Object.entries(jsondata.directSystemCountPerType).map(([name, value]) => ({
    name,
    value,
  }));
  const indirectlyAffectedSystemTypes = Object.entries(jsondata.inDirectSystemCountPerType).map(([name, value]) => ({  name, value }));
  const directlyAffectedApplicationCategory = Object.entries(jsondata.directApplicationCountPerCategory).map(([name, value]) => ({  name, value }));
  const indirectlyAffectedAppsPerService = Object.entries(jsondata.indirectApplicationCountThroughService).map(([name, value]) => ({  name, value }));
  
    const ITAdminSystems = [
        { label: "Affected IT-Admins", value: jsondata.affectedITAdminCount, icon: <HouseIcon className="h-6 w-6 text-red-500" />},
        { label: "Indirect affected Systems", value: jsondata.indirectAffectedSystemCountThroughITAdmin, icon: <HouseIcon className="h-6 w-6 text-red-500" /> },
      ];
  return (
    <div className="flex flex-col items-center justify-center">
  <div className="flex items-center space-x-2 self-start">
    <div style={{ fontSize: "20px", fontWeight: "bold" }}>Indirectly Affected (Online Devices)</div>
  </div>
  <br />
  <div className="self-start text-left w-full" style={{ fontSize: '20px' }}>Systems affected through network</div>

  {/* First Row: First Two Pie Charts */}
  <div className="flex space-x-4 mt-4">
    <div className="flex flex-col items-center">
      <div className="flex">
        {renderPieChart(directlyAffectedSystemTypes)}
      </div>
      <p style={{ marginTop: '-30px', fontSize: '20px' }}>Directly affected System Types</p>
    </div>
    <div className="flex flex-col items-center">
      <div className="flex">
        {renderPieChart(indirectlyAffectedSystemTypes)}
      </div>
      <p style={{ marginTop: '-30px', fontSize: '20px' }}>Indirectly Affected System Types</p>
    </div>
  </div>

  {/* Second Row: Applications and Last Two Pie Charts */}
  <div className="self-start text-left w-full mt-6" style={{ fontSize: '20px' }}>Applications</div>
  <div className="flex space-x-4 mt-4">
    <div className="flex flex-col items-center">
      <div className="flex">
        {renderPieChart(directlyAffectedApplicationCategory)}
      </div>
      <p style={{ marginTop: '-30px', fontSize: '20px' }}>Directly affected Application Category</p>
    </div>
    <div className="flex flex-col items-center">
      <div className="flex">
        {renderPieChart(indirectlyAffectedAppsPerService)}
      </div>
      <p style={{ marginTop: '-30px', fontSize: '20px' }}>Indirectly Affected Apps per Service</p>
    </div>
  </div>

  <div className="self-start text-left w-full mt-6" style={{ fontSize: '20px' }}>IT-Admin Systems</div>
  <br/>
  <div className="flex w-full justify-start gap-6 mb-8">
  {ITAdminSystems.map((item) => (
    <div
      key={item.label}
      className="flex-1 max-w-[300px] bg-gray-100 p-4 rounded shadow flex flex-col justify-center items-center"
    >
      <div className="flex justify-center mb-2">{item.icon}</div>
      <h2 className="text-xl font-semibold">{item.value}</h2>
      <p className="text-center">{item.label}</p>
    </div>
  ))}
</div>
</div>
  );
};

export default IndirectlyAffected;