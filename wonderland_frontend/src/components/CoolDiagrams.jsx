import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { ReactComponent as CoolDiagramsIcon } from '../icons/cool_diagrams.svg';
import { isEmpty } from "../helper";

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
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} display={true}>
        </Cell>
      ))}
    </Pie>
    <Tooltip />
    <Legend layout="vertical" verticalAlign="bottom" align="bottom"  />
  </PieChart>
);


const CoolDiagrams = ({jsondata}) => {
  if(isEmpty(jsondata))
    return <></>;

  const data1 = Object.entries(jsondata.systemsCountPerCriticalAndConsistency).map(([name, value]) => ({
    name,
    value,
  }));
  const data2 = Object.entries(jsondata.systemCountPerType).map(([name, value]) => ({  name, value }));
  const data3 = Object.entries(jsondata.systemCountPerNetworkStatus).map(([name, value]) => ({  name, value }));

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center space-x-2 self-start">
        <CoolDiagramsIcon className="h-6 w-6 text-gray-500" />
        <b>Diagrams</b>
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
          <p style={{ marginTop: '-30px', fontSize: '20px' }}>Network Status</p>
        </div>
      </div>
    </div>
  );
};

export default CoolDiagrams;