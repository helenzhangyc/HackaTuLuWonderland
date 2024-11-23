import React, { useState } from "react";

function Services() {
    const [activeListItem, setActiveListItem] = useState(null);
    const [activeSystemItem, setActiveSystemItem] = useState(null);

    const listButtons = ["Service 1", "Service 2", "Service 3", "Service 4", "Service 5"];
    const systemButtons = ["Device 1", "Device 2", "Device 3", "Device 4", "Device 5"];

    const applicationsPlaceholder = {
        "Service 1": [
            { name: "Application A", affected: true, count: 3 },
            { name: "Application B", affected: false },
        ],
        "Service 2": [
            { name: "Application C", affected: true, count: 5 },
            { name: "Application D", affected: false },
        ],
        // Add more placeholders for "List 3", etc.
    };

    const systemDetailsPlaceholder = {
        "Device 1": [
            { id: 1, type: "Type A", location: "Location A", ip: "192.0.2.1", serviceApp: "App A" },
        ],
        "Device 2": [
            { id: 2, type: "Type B", location: "Location B", ip: "192.0.2.2", serviceApp: "App B" },
        ],
        // Add more placeholders for "System 3", etc.
    };

    const renderApplications = () => {
        const data = applicationsPlaceholder[activeListItem] || [];
        return (
            <ul>
                {data.map((app, index) => (
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
        );
    };

    const renderSystemDetails = () => {
        const data = systemDetailsPlaceholder[activeSystemItem] || [];
        return (
            <div>
                {data.map((system, index) => (
                    <div key={index} className="mb-4">
                        <h5 className="font-bold">Device {system.id}</h5>
                        <p>Type: {system.type}</p>
                        <p>Location: {system.location}</p>
                        <p>IP: {system.ip}</p>
                        <p>Service/App: {system.serviceApp}</p>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div>
            <h3 className="text-2xl font-bold">Dashboard &gt; Systems</h3>
            <div className="grid grid-cols-2 gap-8 mt-4">
                {/* List Section */}
                <div className="p-4 border rounded shadow">
                    <h4 className="text-xl font-bold mb-2">List</h4>
                    <div>
                        {listButtons.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveListItem(item)}
                                className={`block w-full p-2 mb-2 rounded ${activeListItem === item ? "bg-blue-300" : "bg-gray-100"
                                    }`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                    <div className="mt-4">
                        <h5 className="text-lg font-bold">Applications</h5>
                        {activeListItem ? renderApplications() : <p>Select a List to view applications.</p>}
                    </div>
                </div>

                {/* Systems Section */}
                <div className="p-4 border rounded shadow">
                    <h4 className="text-xl font-bold mb-2">Systems</h4>
                    <div>
                        {systemButtons.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveSystemItem(item)}
                                className={`block w-full p-2 mb-2 rounded ${activeSystemItem === item ? "bg-blue-300" : "bg-gray-100"
                                    }`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                    <div className="mt-4">
                        <h5 className="text-lg font-bold">System Details</h5>
                        {activeSystemItem ? renderSystemDetails() : <p>Select a System to view details.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Services;
