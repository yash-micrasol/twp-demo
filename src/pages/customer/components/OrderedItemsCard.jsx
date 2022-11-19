import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrderedItemsCard = ({ data, customer_id }) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex justify-between items-center bg-gray-200 p-2 px-4 cursor-pointer"
      onClick={() =>
        navigate('order-history', {
          state: { customer_id, items: data?.item }
        })
      }
    >
      <div className="flex flex-col space-y-2">
        <p className="font-semibold">{data?.item}</p>
        <p>Last Sold : {data?.last_sold}</p>
      </div>

      <div className="flex justify-center items-center space-x-2">
        <p className="w-11 h-11 flex justify-center items-center bg-blue text-white rounded-full">
          {data?.total_qty}
        </p>
        <FontAwesomeIcon icon={faAngleRight} className="w-5 h-5" />
      </div>
    </div>
  );
};

export default OrderedItemsCard;
