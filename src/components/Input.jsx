import React from 'react';

const Input = (props) => {
  return <input {...props} onWheel={(e) => e.target.blur()} />;
};

export default Input;
