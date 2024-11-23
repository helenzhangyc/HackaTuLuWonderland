import React, { useState } from 'react';
import { ReactComponent as FilterIcon } from '../icons/filters.svg';
import Select from 'react-select';

function Filters() {
  // Dropdown options (getting from database later)
  const dropdownOptions = [
    { value: 'Option 1', label: 'Option 1' },
    { value: 'Option 2', label: 'Option 2' },
    { value: 'Option 3', label: 'Option 3' },
    { value: 'Option 4', label: 'Option 4' },
  ];

  // State for all dropdowns
  const [dropdownStates, setDropdownStates] = useState({
    dropdown1: [],
    dropdown2: [],
    dropdown3: [],
    dropdown4: [],
  });

  // Update handler for dropdowns
  const handleDropdownChange = (key, selectedOptions) => {
    setDropdownStates((prevState) => ({
      ...prevState,
      [key]: selectedOptions,
    }));
  };

  // Dropdown renderer function
  const renderDropdown = (label, key) => (
    <div
      key={key}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '350px',
        marginBottom: '20px',
      }}
    >
      <label htmlFor={key} style={{ marginBottom: '8px' }}>
        {label}
      </label>
      <Select
        id={key}
        options={dropdownOptions}
        isMulti
        placeholder="Select options..."
        value={dropdownStates[key]}
        onChange={(selectedOptions) => handleDropdownChange(key, selectedOptions)}
        styles={{
          container: (provided) => ({
            ...provided,
            width: '100%',
          }),
        }}
      />
    </div>
  );

  return (
    <div>
      <div className="flex items-center space-x-2">
        <FilterIcon className="h-6 w-6 text-gray-500" />
        <div>
          <b>Filters</b>
        </div>
      </div>
      <br />
      <div className="flex flex-wrap gap-4 mb-8">
        {['Software Installation', 'Type', 'Organization Units', 'Services'].map((label, index) =>
          renderDropdown(label, `dropdown${index + 1}`)
        )}
      </div>
    </div>
  );
}

export default Filters;
