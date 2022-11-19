import React from 'react';

const OrderHistoryCard = ({ data }) => {
  return (
    <div className="flex justify-between items-center bg-gray-200 p-2 px-4 last:rounded-b-md">
      <div className="flex flex-col space-y-2">
        <p className="font-semibold">Inv. {data?.invoice_number}</p>
        <p>{data?.invoice_data?.invoice_date}</p>
      </div>

      <div className="flex justify-center items-center space-x-6">
        <p className="text-green">${data?.invoice_data?.invoice_amount}</p>
        <p className="w-10 h-10 bg-blue text-white flex justify-center items-center rounded-full">
          {data?.quantity}
        </p>
      </div>
    </div>
  );
};

export default OrderHistoryCard;
