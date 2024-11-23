import Filters from "./components/Filters";
import Insights from "./components/Insights";
import CoolDiagrams from "./components/CoolDiagrams";
import Persons from "./components/Persons";

function App() {
  return (
    <div className="p-8">
      <h2 className="text-4xl font-extrabold dark:text-white">Dashboard</h2>
      <br />
      <Filters />
      <Insights />
      <br />
      <CoolDiagrams />
      <br />
      <Persons />
    </div>
  );
}

export default App;