import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { ReactComponent as CoolDiagramsIcon } from '../icons/cool_diagrams.svg';
import jsondata from '../jsons/test.json';

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const directlyAffectedSystemTypes = Object.entries(jsondata.directSystemCountPerType).map(([name, value]) => ({
  name,
  value,
}));
const indirectlyAffectedSystemTypes = Object.entries(jsondata.inDirectSystemCountPerType).map(([name, value]) => ({  name, value }));
const directlyAffectedApplicationCategory = Object.entries(jsondata.directApplicationCountPerCategory).map(([name, value]) => ({  name, value }));
const indirectlyAffectedAppsPerService = Object.entries(jsondata.indirectApplicationCountThroughService).map(([name, value]) => ({  name, value }));

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
        <div className="text-3xl font-bold">Indirectly Affected (Online Devices)</div>
        <br/>
        <b>Systems affected through network</b>
      </div>
      <div className="flex space-x-4">
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
    </div>
  );
};

export default CoolDiagrams;