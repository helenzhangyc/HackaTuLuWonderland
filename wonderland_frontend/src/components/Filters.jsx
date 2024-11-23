import React, { useState } from 'react';
import { ReactComponent as FilterIcon } from '../icons/filters.svg';

function Filters() {
  // Dropdown values (getting from database later)
  const dropdownValues = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

  // State for all dropdowns
  const [dropdownStates, setDropdownStates] = useState({
    dropdown1: 'All',
    dropdown2: 'All',
    dropdown3: 'All',
    dropdown4: 'All',
  });

  // Update handler for dropdowns
  const handleDropdownChange = (key, value) => {
    setDropdownStates((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  // Dropdown renderer function
  const renderDropdown = (label, key) => (
    <div key={key}
    style={{ 
        justifyContent: 'center',
        alignItems: 'center',
         width: '350px' }}>
      <label htmlFor={key}>{label}</label>
      <select
      class="block w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        id={key}
        value={dropdownStates[key]}
        onChange={(e) => handleDropdownChange(key, e.target.value)}
        style={{ display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
             width: '100%' }}
      >
        <option value="All">All</option>
        {dropdownValues.map((value, index) => (
          <option key={index} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );


    return (
      <div>
      <div className="flex items-center space-x-2">
  <FilterIcon className="h-6 w-6 text-gray-500" />
  <div><b>Filters</b></div>
</div>
<br/>
      <div className="flex gap-4 mb-8">
        
        <div class="relative inline-block text-left" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', gap: '20px', marginBottom: '20px' }}>
        
        
      {['Software Installation', 'Type', 'Organization Units', 'Services'].map((label, index) =>
        renderDropdown(label, `dropdown${index + 1}`)
      )}
    </div>
      </div>
      </div>
    );
  }
  
  export default Filters;
  