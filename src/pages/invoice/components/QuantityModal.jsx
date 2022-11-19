import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import Modal from '../../../components/Modal';
import { editInvoiceItems } from '../../../store/invoice/slice';

const QuantityModal = ({ show, setShow, data, setRecall }) => {
  const [val, setVal] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    data?.quantity && setVal(data?.quantity);
  }, [data]);

  return (
    <Modal show={show}>
      <div className="space-y-4">
        <p className="py-3 rounded text-center bg-blue font-bold text-white">{data?.item}</p>
        <div className="flex items-center gap-4 px-2">
          <label htmlFor="quantity" className="font-semibold">
            Quantity
          </label>
          <Input
            min={0}
            id="quantity"
            value={val}
            type="number"
            className="w-full outline-none p-3 border-2"
            onChange={(e) => setVal(e.target.value)}
          />
        </div>
        <div className="flex justify-center items-center gap-4 font-semibold p-3">
          <Button
            color="gray"
            onClick={() => {
              setShow(false);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              setShow(false);
              dispatch(editInvoiceItems({ item_id: data?.id, qty: val })).then((e) => {
                      if (e.type === "editInvoiceItems/fulfilled") {
                        setRecall((prev) => {
                          return !prev;
                        });
                      }
                    });
            }}
          >
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default QuantityModal;
