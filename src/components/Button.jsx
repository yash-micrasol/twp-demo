import React from 'react';

const Button = ({ props, color, onClick, className, children }) => {
  const btnColor = (clr) => {
    switch (clr) {
      case 'gray':
        return 'bg-gray-200 text-black';
      case 'white':
        return 'bg-white text-blue border border-blue';
      default:
        return 'bg-blue text-white';
    }
  };
  return (
    <button
      {...props}
      className={`px-5 py-4 rounded-md ${className ?? ''} ${btnColor(color)}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
