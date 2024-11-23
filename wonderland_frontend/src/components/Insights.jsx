import { ReactComponent as InfectedIcon } from '../icons/infected_system.svg';
import { ReactComponent as ServicesIcon } from '../icons/services.svg';
import { ReactComponent as NetworksIcon } from '../icons/networks.svg';
import { ReactComponent as InsightsIcon } from '../icons/insights.svg';
import jsondata from '../jsons/test.json';

function Insights() {
    // need to retrieve the values from db later
    const data = [
      { label: "Infected System", value: jsondata.affectedSystemsCount, icon: <InfectedIcon className="h-6 w-6 text-red-500" /> },
      { label: "Services", value: jsondata.affectedServicesCount, icon: <ServicesIcon className="h-6 w-6 text-blue-500" />  },
      { label: "Networks", value: jsondata.affectedNetworksCount, icon: <NetworksIcon className="h-6 w-6 text-green-500" /> },
    ];
  
    return (
      <div>
        <div className="flex items-center space-x-2">
  <InsightsIcon className="h-6 w-6 text-gray-500" />
  <div><b>Insights</b></div>
</div>
      <br/>
      <div className="flex gap-6 mb-8">
        {data.map((item) => (
          <div key={item.label} className="flex-1 bg-gray-100 p-4 rounded shadow flex flex-col justify-center items-center">
            <div className="flex justify-center mb-2">
              {item.icon}
            </div>
              <h2 className="text-xl font-semibold">{item.value}</h2>
            <p>{item.label}</p>
          </div>
        ))}
      </div>
      </div>
    );
  }
  
  export default Insights;
  