function Insights() {
    const data = [
      { label: "Infected System", value: 200 },
      { label: "Services", value: 20 },
      { label: "Networks", value: 34 },
    ];
  
    return (
      <div className="flex gap-6 mb-8">
        {data.map((item) => (
          <div key={item.label} className="flex-1 bg-gray-100 p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{item.value}</h2>
            <p>{item.label}</p>
          </div>
        ))}
      </div>
    );
  }
  
  export default Insights;
  