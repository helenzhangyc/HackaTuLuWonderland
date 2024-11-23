import React, { useState } from 'react';
import { SVGProps } from 'react';

function Filters(props) {
  // Dropdown values
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
         width: '100%' }}>
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
      <div className="flex gap-4 mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="3em" viewBox="0 0 24 24" {...props}><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4h16v2.172a2 2 0 0 1-.586 1.414L15 12v7l-6 2v-8.5L4.52 7.572A2 2 0 0 1 4 6.227z"></path></svg>
        <div class="relative inline-block text-left" style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
      {['Dropdown 1', 'Dropdown 2', 'Dropdown 3', 'Dropdown 4'].map((label, index) =>
        renderDropdown(label, `dropdown${index + 1}`)
      )}
    </div>
      </div>
    );
  }
  
  export default Filters;
  