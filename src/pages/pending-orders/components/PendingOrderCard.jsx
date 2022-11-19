import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const PendingOrderCard = ({ data }) => {
  const naviagate = useNavigate();
  return (
    <div
      className="flex justify-between items-center bg-gray-200 p-2 px-4 cursor-pointer"
      onClick={() => {
        naviagate('details', {
          state: { invoice_number: data.invoice_number }
        });
      }}
    >
      <div className="space-y-1">
        <p className="font-semibold">{data?.customer_name}</p>
        <p>Order Date: {data?.invoice_date}</p>
        <p>Delivery Date: {data?.delivery_date}</p>
      </div>

      <div className="text-darkGray font-semibold flex space-x-2">
        {data.status === 'qb_inv_gene' && (
          <p className="flex justify-center items-center border border-black w-8 h-8 rounded-full bg-white">
            qb
          </p>
        )}
        {data.picked_status === 'delivered' && (
          <p className="flex justify-center items-center border border-black w-8 h-8 rounded-full bg-indigo-400">
            D
          </p>
        )}
      </div>

      <div className="flex justify-center items-center space-x-2">
        <p className="text-pink">Details</p>
        <FontAwesomeIcon icon={faAngleRight} className="w-5 h-5" />
      </div>
    </div>
  );
};

export default PendingOrderCard;
