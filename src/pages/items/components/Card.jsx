import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import newLogo from '../../../assets/newItem.png';

const ItemCard = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex justify-between items-center bg-gray-200 p-2 px-4 cursor-pointer"
      onClick={() => {
        navigate('details', { state: { data } });
      }}
    >
      <div className="flex flex-col space-y-2">
        <p className="font-semibold">{data?.item_name ?? ''}</p>
        {data?.next_delivery_date && (
          <p className="font-light">Next Delivery Date: {data?.next_delivery_date}</p>
        )}
      </div>

      <div className="flex items-center space-x-2 z-10">
        <div className="relative">
          {data?.new_item === 1 && (
            <img src={newLogo} alt="new" className="absolute w-8 h-8 -top-2 -left-4 -z-[1]" />
          )}
          <p
            className={`w-10 h-10 rounded-full ${
              data?.qty_on_hands > 0 ? 'bg-green' : 'bg-pink'
            } text-white flex justify-center items-center`}
          >
            {data?.qty_on_hands}
          </p>
        </div>
        <FontAwesomeIcon icon={faAngleRight} className="w-5 h-5" />
      </div>
    </div>
  );
};

export default ItemCard;
