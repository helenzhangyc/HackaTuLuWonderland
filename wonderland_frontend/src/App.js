import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Filters from "./components/Filters";
import Insights from "./components/Insights";
import CoolDiagrams from "./components/CoolDiagrams";
import Persons from "./components/Persons";
import Services from "./components/Services";
import ITContactPeople from "./components/ITContactPeople";
import OrganizationUnits from "./components/OrganizationUnits";
import Systems from "./components/Systems";

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
        </Routes>
      </div>
    </Router>
  );
}

// Main Dashboard Component
function Dashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <h2 className="text-4xl font-extrabold dark:text-white">Dashboard</h2>
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
      <Filters />
      <Insights />
      <CoolDiagrams />
      <Persons />
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
