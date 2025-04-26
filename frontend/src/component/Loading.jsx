import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-16 h-16 border-2 border-gray-300 border-t-green-600 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
