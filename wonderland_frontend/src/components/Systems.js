function Systems() {
    const systemsData = [
        {
            id: 1,
            type: "Client",
            location: "Munich, Germany",
            serviceProvider: "Google",
            ip: "192.168.44.237",
            serviceApp: "Desktop",
        },
        // Add more systems here if needed
    ];

    const servicesData = [
        { name: "Service 1", owner: "Karl" },
        { name: "Service 2", owner: "Hans" },
        // Add more services here if needed
    ];

    const applicationsData = [
        { name: "Application 1", affected: true, count: 3 },
        { name: "Application 2", affected: false },
        { name: "Application 3", affected: true, count: 1 },
        { name: "Application 4", affected: false },
    ];

    return (
        <div>
            <h3 className="text-2xl font-bold">Dashboard &gt; Systems</h3>
            <div className="grid grid-cols-2 gap-8 mt-4">
                {/* Services List */}
                <div className="p-4 border rounded shadow">
                    <h4 className="text-xl font-bold mb-2">List</h4>
                    <ul>
                        {servicesData.map((service, index) => (
                            <li key={index} className="p-2">
                                <div>
                                    <span className="font-bold">{service.name}</span>
                                    <br />
                                    <span className="text-sm text-gray-600">
                                        Service Owner: {service.owner}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Applications List */}
                <div className="p-4 border rounded shadow">
                    <h4 className="text-xl font-bold mb-2">Applications</h4>
                    <ul>
                        {applicationsData.map((app, index) => (
                            <li
                                key={index}
                                className={`p-2 ${app.affected ? "text-red-600" : ""}`}
                            >
                                {app.name} {app.affected && `(${app.count})`}
                                <br />
                                <span className="text-sm">
                                    {app.affected ? "Affected" : "Not Affected"}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Systems List */}
                <div className="p-4 border rounded shadow">
                    <h4 className="text-xl font-bold mb-2">Systems</h4>
                    <ul>
                        {systemsData.map((system, index) => (
                            <li key={index} className="p-2">
                                <span>Device {system.id}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* System Details */}
                <div className="p-4 border rounded shadow">
                    <h4 className="text-xl font-bold mb-2">System Details</h4>
                    {systemsData.map((system, index) => (
                        <div key={index} className="mb-4">
                            <h5 className="font-bold">Device {system.id}</h5>
                            <p>Type: {system.type}</p>
                            <p>Location: {system.location}</p>
                            <p>ServiceProvider: {system.serviceProvider}</p>
                            <p>IP: {system.ip}</p>
                            <p>Service/App: {system.serviceApp}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Systems;
