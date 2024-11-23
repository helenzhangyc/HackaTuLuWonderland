import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Filters from "./components/Filters";
import Insights from "./components/Insights";
import CoolDiagrams from "./components/CoolDiagrams";
import Persons from "./components/Persons";
import Services from "./components/Services";
import ITContactPeople from "./components/ITContactPeople";
import OrganizationUnits from "./components/OrganizationUnits";
import Systems from "./components/Systems";
import SuggestedSolution from "./components/SuggestedSolution";
import DataVisualizations from "./components/DataVisualizations";
import IndirectlyAffected from "./components/IndirectlyAffected";
import { useEffect, useState } from "react";

function App() {


  return (
    <Router>
      <div className="p-8">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/services" element={<WithBackButton component={Services} />} />
          <Route
            path="/it-contact-people"
            element={<WithBackButton component={ITContactPeople} />}
          />
          <Route
            path="/organization-units"
            element={<WithBackButton component={OrganizationUnits} />}
          />
          <Route path="/systems" element={<WithBackButton component={Systems} />} />
          <Route path="/suggested-solution" element={<SuggestedSolution />} />
          <Route path="/data-visualizations" element={<DataVisualizations />} />
        </Routes>
      </div>
    </Router>
  );
}

// Main Dashboard Component
function Dashboard() {
  const navigate = useNavigate();

  const [jsondata, setJsonData] = useState({});

  useEffect(() => {
    // Fetch the data from the API endpoint
    fetch('http://localhost:5033/dashboard-stats')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setJsonData(data); // Set the fetched data to state
      })
      .catch((error) => {
        console.error('Error fetching the JSON data:', error);
      });
  }, []);


  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-4xl font-extrabold dark:text-white">Dashboard</h2>
        <div className="flex space-x-4">
          <button
            onClick={() => navigate("/data-visualizations")}
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
      </div>
      <div className="flex justify-between space-x-4 mt-8">
        <button
          onClick={() => navigate("/services")}
          className="flex-1 p-4 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
        >
          Services
        </button>
        <button
          onClick={() => navigate("/it-contact-people")}
          className="flex-1 p-4 bg-green-500 text-white rounded shadow hover:bg-green-600"
        >
          IT Contact People
        </button>
        <button
          onClick={() => navigate("/organization-units")}
          className="flex-1 p-4 bg-purple-500 text-white rounded shadow hover:bg-purple-600"
        >
          Organization Units
        </button>
        <button
          onClick={() => navigate("/systems")}
          className="flex-1 p-4 bg-red-500 text-white rounded shadow hover:bg-red-600"
        >
          Systems
        </button>
      </div>
      <br />
      {/* <Filters /> */}
      <Insights jsondata={jsondata} />
      <CoolDiagrams jsondata={jsondata} />
      <Persons jsondata={jsondata} />
      <IndirectlyAffected jsondata={jsondata} />
    </div>
  );
}


// Higher-Order Component to add a Back button
function WithBackButton({ component: Component }) {
  const navigate = useNavigate();

  return (
    <div>
      <Component />
      <br />
      <button
        onClick={() => navigate("/")}
        className="mb-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
      >
        Back
      </button>
    </div>
  );
}

export default App;
