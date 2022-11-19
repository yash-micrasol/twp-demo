import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CustomerCard = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex justify-between items-center bg-gray-200 p-2 px-4 cursor-pointer"
      onClick={() => navigate('details', { state: { customer_id: data.id } })}
    >
      <div className="flex flex-col space-y-2">
        <p className="font-semibold">{data?.customer_name}</p>
        <p>
          {data?.city} , {data?.state}
        </p>
      </div>

      <FontAwesomeIcon icon={faAngleRight} className="w-5 h-5" />
    </div>
  );
};

export default CustomerCard;
