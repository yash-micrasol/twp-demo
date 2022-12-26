import React from 'react';

const MiniLoader = ({ className = '' }) => {
  return (
    <div className="flex items-center justify-center w-full p-2">
      <div
        className={`border-t-transparent border-solid animate-spin  rounded-full border-blue border-4 h-10 w-10 z-1 ${className}`}
      />
    </div>
  );
};

export default MiniLoader;