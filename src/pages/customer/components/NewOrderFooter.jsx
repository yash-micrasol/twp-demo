import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button';

const NewOrderFooter = ({ total, order, customer_id }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full bg-white max-w-[450px] fixed bottom-0 z-[999]">
      <div className="bg-white font-semibold flex justify-between p-4">
        <p>Order total:</p>
        <p>$ {total}</p>
      </div>
      <Button
        className="w-full rounded-none font-semibold"
        onClick={() => {
          total !== 0 &&
            navigate('review-order', {
              state: { order, total, customer_id }
            });
        }}
      >
        Next
      </Button>
    </div>
  );
};

export default NewOrderFooter;
