import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button';
import { addInvoiceItems } from '../../../store/invoice/slice';

const NewItemFooter = ({ total, order, invoice_id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="w-full bg-white max-w-[450px] fixed bottom-0 z-[999]">
      <div className="bg-white font-semibold flex justify-between p-4 shadow-[0_-1px_5px_0px_rgba(0,0,0,0.1)]">
        <p>Order total:</p>
        <p>$ {total}</p>
      </div>
      <Button
        className="w-full rounded-none font-semibold"
        onClick={() => {
          const tempOrder = Object.values(order).map((e) => {
            return { item_id: e.item_id, qty: e.qty };
          });
          if (total !== 0) {
            dispatch(
              addInvoiceItems({
                item_details: JSON.stringify(tempOrder),
                invoice_id
              })
            ).then((e) => {
              e.type === 'addInvoiceItems/fulfilled' && navigate(-1);
            });
          }
        }}
      >
        Next
      </Button>
    </div>
  );
};

export default NewItemFooter;
