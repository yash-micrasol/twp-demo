import React from 'react';

const MiniLoader = ({ className = '' }) => {
  return (
    <div className="w-full flex justify-center items-center p-2">
      <div
        className={`border-t-transparent border-solid animate-spin  rounded-full border-blue border-4 h-10 w-10 z-1 ${className}`}
      />
    </div>
  );
};

export default MiniLoader;
