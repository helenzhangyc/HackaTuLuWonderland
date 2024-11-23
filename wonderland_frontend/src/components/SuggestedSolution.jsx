import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// "Suggested Solution" Page Component
function SuggestedSolution() {
    const navigate = useNavigate();
  
    return (
      <div>
        <h2 className="text-3xl font-bold text-gray-800">Suggested Solution</h2>
        <p className="mt-4 text-gray-600">This page will contain suggested solutions or recommendations.</p>
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
  
  export default SuggestedSolution;