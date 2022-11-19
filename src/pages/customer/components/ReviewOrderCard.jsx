import React from 'react';

const ReviewOrderCard = ({ data }) => {
  return (
    <div className="bg-gray-200 font-semibold p-3 space-y-2">
      <p>{data.name}</p>
      <div className="flex justify-between">
        <p>
          Qty : <span className="text-green">{data.qty}</span>
        </p>
        <p>Total : ${data.price}</p>
      </div>
    </div>
  );
};

export default ReviewOrderCard;
