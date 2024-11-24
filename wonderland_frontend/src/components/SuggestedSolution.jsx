import React from "react";
import { ReactComponent as ApplicationsIcon } from "../icons/applications.svg";
import { ReactComponent as InfectedIcon } from "../icons/infected_system.svg";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useNavigate } from "react-router-dom";
import { isEmpty } from "../helper";

function SuggestedSolution({ jsondata }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-8">
      <div className="w-full max-w-4xl">
        {/* Navigation Buttons */}
        <div className="flex justify-end space-x-4 mb-8">
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-indigo-500 text-white rounded shadow hover:bg-indigo-600"
          >
            Data Visualization
          </button>
          <button
            onClick={() => navigate("/suggested-solution")}
            className="px-4 py-2 bg-teal-500 text-white rounded shadow hover:bg-teal-600"
          >
            Suggested Solution
          </button>
        </div>

        <h1 className="text-2xl font-bold mb-6">Recommended Steps</h1>

        {/* Step 1 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            1. Check Applications Running on Affected Systems
          </h2>
          <Step1 jsondata={jsondata} />
          <br/>
          <ul className="list-disc pl-6 space-y-2">
            <li>Talk with the IT Teams of the Applications</li>
            <li>Check if they depend on Docker</li>
            <li>Scan the app for contamination and move it to a secure system</li>
          </ul>
        </div>

        {/* Step 2 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            2. Check Systems that Are Offline
          </h2>
          <Step2 jsondata={jsondata} />
          <br/>
          <ul className="list-disc pl-6 space-y-2">
            <li>Talk with the IT Teams and make sure the systems are physically secured</li>
          </ul>
        </div>

        {/* Step 3 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            3. All Potentially Affected Systems That Are Inconsistent or Unknown
          </h2>
          <Step3 jsondata={jsondata} />
          <br/>
          <ul className="list-disc pl-6 space-y-2">
            <li>Consult the IT Team for details to plan further steps</li>
          </ul>
        </div>

        {/* Step 4 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            4. Indirectly Affected Systems Which Are Critical
          </h2>
          <Step4 jsondata={jsondata} />
          <ul className="list-disc pl-6 space-y-2">
            <li>Quarantine the systems and check for contamination</li>
            <li>Isolate them from the vulnerable systems</li>
          </ul>
        </div>

        {/*Step 5*/}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            5. Indirect affected Systems which are not critical
          </h2>
          <Step5 jsondata={jsondata} />
          <ul className="list-disc pl-6 space-y-2">
            <li>Shutdown the systems
            </li>
            <li>If we are sure they are not contaminated, then move them into an isolated network</li>
          </ul>
        </div>

        {/*Step 6*/}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            6. Direct Systems which are critical
          </h2>
          <Step6 jsondata={jsondata} />
          <ul className="list-disc pl-6 space-y-2">
            <li>If possible, talk with the IT Teams to migrate to podman, then quarantine them and isolate them afterwards</li>
            <li>If not, put them into an isolted network or shutdown, depending on the cost calculation</li>
          </ul>
        </div>

        {/*Step 7*/}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            7. Direct Systems which are not critical
          </h2>
          <Step7 jsondata={jsondata} />
          <ul className="list-disc pl-6 space-y-2">
            <li>Shutdown</li>
          </ul>
        </div>

      </div>
    </div>
  );
}

function Step1({ jsondata }) {
  if (isEmpty(jsondata)) return null;

  const data = [
    {
      label: "Directly Affected Applications",
      value: jsondata.directAffectedApplicationsCount,
      icon: <ApplicationsIcon className="h-6 w-6 text-red-500" />,
    },
  ];

  return (
    <div className="flex gap-6">
      {data.map((item) => (
        <div
          key={item.label}
          className="bg-gray-100 p-4 rounded shadow flex flex-col items-center"
        >
          {item.icon}
          <h2 className="text-xl font-semibold">{item.value}</h2>
          <p>{item.label}</p>
        </div>
      ))}
    </div>
  );
}

function Step2({ jsondata }) {
  if (isEmpty(jsondata)) return null;

  const data = [
    {
      label: "Directly Affected Systems (Offline)",
      value: jsondata.directSystemsWhichAreOfflineCount,
      icon: <InfectedIcon className="h-6 w-6 text-red-500" />,
    },
  ];

  return (
    <div className="flex gap-6">
      {data.map((item) => (
        <div
          key={item.label}
          className="bg-gray-100 p-4 rounded shadow flex flex-col items-center"
        >
          {item.icon}
          <h2 className="text-xl font-semibold">{item.value}</h2>
          <p>{item.label}</p>
        </div>
      ))}
    </div>
  );
}

function Step3({ jsondata }) {
  if (isEmpty(jsondata)) return null;

  const data = [
    {
      label: "Unknown and Inconsistent Systems",
      value: jsondata.indirectDirectSystemsWhichAreInconsistentOrTypeUnknownCount,
      icon: <InfectedIcon className="h-6 w-6 text-red-500" />,
    },
  ];

  return (
    <div className="flex gap-6">
      {data.map((item) => (
        <div
          key={item.label}
          className="bg-gray-100 p-4 rounded shadow flex flex-col items-center"
        >
          {item.icon}
          <h2 className="text-xl font-semibold">{item.value}</h2>
          <p>{item.label}</p>
        </div>
      ))}
    </div>
  );
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, value }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
      {value}
    </text>
  );
};

const renderPieChart = (data) => (
  <PieChart width={200} height={300} className="mb-20">
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
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
    <Tooltip />
    <Legend layout="vertical" verticalAlign="bottom" align="bottom" />
  </PieChart>
);


function Step4({ jsondata }) {
  if (isEmpty(jsondata)) return null;

  const data = Object.entries(jsondata.indirectAffectedSystemsCriticalCount).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <div className="flex-shrink-0">{renderPieChart(data)}</div>
        <p className="ml-4 text-lg">Network Status</p>
      </div>
    </div>
  );
}

function Step5({ jsondata }) {
  if (isEmpty(jsondata)) return null;

  const data = Object.entries(jsondata.indirectAffectedSystemsUnCriticalCount).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <div className="flex-shrink-0">{renderPieChart(data)}</div>
        <p className="ml-4 text-lg">Network Status</p>
      </div>
    </div>
  );
}

function Step6({ jsondata }) {
  if (isEmpty(jsondata)) return null;

  const data = Object.entries(jsondata.directSystemsCriticalCount).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <div className="flex-shrink-0">{renderPieChart(data)}</div>
        <p className="ml-4 text-lg">Network Status</p>
      </div>
    </div>
  );
}

function Step7({ jsondata }) {
  if (isEmpty(jsondata)) return null;

  const data = Object.entries(jsondata.directSystemsUnCriticalCount).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <div className="flex-shrink-0">{renderPieChart(data)}</div>
        <p className="ml-4 text-lg">Network Status</p>
      </div>
    </div>
  );
}

export default SuggestedSolution;
