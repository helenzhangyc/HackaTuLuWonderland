import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// "Suggested Solution" Page Component
function SuggestedSolution() {
    const navigate = useNavigate();
  
    return (
      <div className="flex items-center justify-center">
      <div className="w-full max-w-4xl p-8">
      <div className="container mx-auto">
        <div className="flex space-x-4">
          <button style={{ display: 'flex', justifyContent: 'flex-end' }}
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-indigo-500 text-white rounded shadow hover:bg-indigo-600"
          >
            Data Visualization
          </button>
          <button style={{ display: 'flex', justifyContent: 'flex-end' }}
            onClick={() => navigate("/suggested-solution")}
            className="px-4 py-2 bg-teal-500 text-white rounded shadow hover:bg-teal-600"
          >
            Suggested Solution
          </button>
        </div>
        <br/>
        <h2 className="text-3xl font-bold text-gray-800">Suggested Solution</h2>
        <p className="mt-4 text-gray-600">This page will contain suggested solutions or recommendations.</p>
      </div>
      </div>
      </div>
    );
  }
  
  export default SuggestedSolution;