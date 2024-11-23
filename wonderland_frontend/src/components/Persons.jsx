function Persons() {
    const data = [
      { label: "IT Admins", value: 500 },
      { label: "Users", value: 5000 },
      { label: "Head of involved OU", value: 40 },
      { label: "Service Owners", value: 11 },
    ];
  
    const locations = [
      { label: "Organisation Units", value: 8 },
      { label: "Countries", value: 2 },
      { label: "Locations", value: 21 },
    ];
  
    return (
      <div>
        <div className="flex gap-6 mb-8">
          {data.map((item) => (
            <div key={item.label} className="flex-1 bg-gray-100 p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{item.value}</h2>
              <p>{item.label}</p>
            </div>
          ))}
        </div>
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
  