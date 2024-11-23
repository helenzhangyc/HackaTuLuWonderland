import { ReactComponent as PersonsIcon } from '../icons/persons.svg';
import { ReactComponent as OtherIcon } from '../icons/other.svg';
import { ReactComponent as PeopleIcon } from '../icons/people.svg';
import { ReactComponent as HouseIcon } from '../icons/house.svg';
import { Fragment, React } from 'react';

function Persons(jsondata) {
    const data = [
      { label: "IT Responsibles\nIT Admins & Security Coordinator", value: jsondata.directAffectedITResponsibles },
      { label: "Users", value: jsondata.directAffectedUsers },
      { label: "Service Owners", value: jsondata.directAffectedServiceOwners },
    ];
  
    const locations = [
      { label: "Organization Units", value: jsondata.directAffectedOUs },
      { label: "Countries", value: jsondata.directAffectedCountries },
      { label: "Locations", value: jsondata.directAffectedLocations },
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
    <div key={item.label} className="flex-1 bg-gray-100 p-4 rounded shadow text-center flex flex-col items-center">
    <PeopleIcon className="h-12 w-12 text-gray-500 mb-2" />
    <h2 className="text-3xl font-bold">{item.value}</h2>
    <p>
      {item.label.split('\n').map((line, index) => (
        <Fragment key={index}>
          {line}
          <br />
        </Fragment>
      ))}
    </p>
  </div>
  ))}
</div>

<div className="flex gap-6 mb-8">
  {locations.map((item) => (
    <div key={item.label} className="flex-1 bg-gray-100 p-4 rounded shadow text-center flex flex-col items-center">
    <HouseIcon className="h-12 w-12 text-gray-500 mb-2" />
    <h2 className="text-3xl font-bold">{item.value}</h2>
    <p>
      {item.label.split('\n').map((line, index) => (
        <Fragment key={index}>
          {line}
          <br />
        </Fragment>
      ))}
    </p>
  </div>
  ))}
</div>
</div>
    );
  }
  
  export default Persons;
  