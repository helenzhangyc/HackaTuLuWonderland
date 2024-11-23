import { ReactComponent as PersonsIcon } from '../icons/persons.svg';
import { ReactComponent as OtherIcon } from '../icons/other.svg';
import jsondata from '../jsons/test.json';

function Persons() {
    const data = [
      { label: "IT Admins", value: jsondata.affectedITAdmins },
      { label: "Users", value: jsondata.affectedUsers },
      { label: "Head of involved OU", value: jsondata.affectedOUs },
      { label: "Service Owners", value: jsondata.affectedServiceOwners },
    ];
  
    const locations = [
      { label: "Organisation Units", value: 8 },
      { label: "Countries", value: jsondata.affectedCountries },
      { label: "Locations", value: jsondata.affectedLocations },
    ];
  
    return (
      <div>
        <div className="flex items-center space-x-2">
  <PersonsIcon className="h-6 w-6 text-gray-500" />
  <div><b>Persons</b></div>
</div>
<br/>
        <div className="flex gap-6 mb-8">
          {data.map((item) => (
            <div key={item.label} className="flex-1 bg-gray-100 p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{item.value}</h2>
              <p>{item.label}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center space-x-2">
  <OtherIcon className="h-6 w-6 text-gray-500" />
  <div><b>Other</b></div>
</div>
<br/>
        <div className="flex gap-6">
          {locations.map((item) => (
            <div key={item.label} className="flex-1 bg-gray-100 p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{item.value}</h2>
              <p>{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default Persons;
  