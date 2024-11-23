import Filters from "./components/Filters";
import Insights from "./components/Insights";
import CoolDiagrams from "./components/CoolDiagrams";
import Persons from "./components/Persons";

function App() {
  return (
    <div className="p-8">
      <h2 class="text-4xl font-extrabold dark:text-white">Dashboard</h2>
      <br />
      <Filters />
      <Insights />
      <CoolDiagrams />
      <Persons />
    </div >
  );
}

export default App;


