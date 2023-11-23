// Spinner.jsx
import React from "react";

const Spinner = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="flex items-center">
        <div className="animate-spin rounded-full border-t-4 border-blue-500 border-opacity-25 border-r-4 border-opacity-50 h-12 w-12"></div>
        <span className="ml-3 text-white">Carregando...</span>
      </div>
    </div>
  );
};

export default Spinner;
