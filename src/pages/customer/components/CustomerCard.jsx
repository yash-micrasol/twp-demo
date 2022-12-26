import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCustomerData } from '../../../store/customer/slice';

const CustomerCard = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div
      className="flex items-center justify-between p-2 px-4 bg-gray-200 cursor-pointer"
      onClick={() => {
        navigate(`${data.id}`);
        dispatch(setCustomerData(data));
      }}
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
