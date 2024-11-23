import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// "Suggested Solution" Page Component
function DataVisualizations() {
    const navigate = useNavigate();
  
    return (
      <div>
        <h2 className="text-3xl font-bold text-gray-800">Data Visualization</h2>
        <p className="mt-4 text-gray-600">This page will contain data visualization of the digital twins database.</p>
        <br />
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }
  
  export default DataVisualizations;