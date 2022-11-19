import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getStatus } from '../../../helpers/constant';

const ItemCard = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex justify-between items-center bg-gray-200 p-2 px-4 cursor-pointer"
      onClick={() => navigate('invoice-item', { state: { id: data.id } })}
    >
      <div className="flex flex-col space-y-2">
        <p className="font-semibold">{data?.customer_name ?? ''}</p>

        <p className="font-light">
          {data?.invoice_count} {data?.invoice_count <= 1 ? 'Invoice' : 'Invoices'}{' '}
          {data?.invoice_date}
        </p>
      </div>

      <div>{getStatus(data?.qb_status)}</div>

      <div className="flex items-center space-x-2 z-10">
        <p className="text-pink">${data?.total_opening_balance}</p>
        <FontAwesomeIcon icon={faAngleRight} className="w-5 h-5" />
      </div>
    </div>
  );
};

export default ItemCard;
