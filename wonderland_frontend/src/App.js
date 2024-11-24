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
import './App.css'

function App() {
  const [recommendedStepsData, setRecommendedStepsData] = useState({});

  useEffect(() => {
    // Fetch the data from the API endpoint
    fetch('https://api.hackatuluwonderland.de/recommended-steps')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setRecommendedStepsData(data); // Set the fetched data to state
      })
      .catch((error) => {
        console.error('Error fetching the JSON data:', error);
      });
  }, []);

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
          <Route path="/suggested-solution" element={<SuggestedSolution jsondata={recommendedStepsData} />} />
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
    fetch('https://api.hackatuluwonderland.de/dashboard-stats')
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
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-4xl p-8">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex space-x-4" style={{ display: 'flex', justifyContent: 'flex-end' }}>
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
          </div>
          <br />
          {/* <Filters /> */}
          <Insights jsondata={jsondata} />
          <CoolDiagrams jsondata={jsondata} />
          <Persons jsondata={jsondata} />
          <IndirectlyAffected jsondata={jsondata} />
        </div >
      </div>
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
