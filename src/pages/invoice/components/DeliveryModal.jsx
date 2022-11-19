import React from 'react';
import Modal from '../../../components/Modal';
import Button from '../../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { editDeliveryPerson } from '../../../store/invoice/slice';
import Input from '../../../components/Input';

const DeliveryModal = ({ invId, selected, show, setShow, setRecall }) => {
  const dispatch = useDispatch();
  const { deliveryPersonList: data } = useSelector((store) => store.invoice);

  return (
    <Modal show={show}>
      <div className="w-full flex flex-col justify-center items-center space-y-6 font-semibold">
        <p className="text-4xl p-4 pb-8 text-center border-b">Delivery Persons</p>
        <ul className="w-full space-y-6 py-2 px-12">
          {(data?.person_list ?? []).map((e, key) => {
            return (
              <li key={key} className="w-full flex space-x-3">
                <Input
                  id={e.id}
                  value={e.id}
                  checked={selected === e.id}
                  name="btnGroup"
                  type="checkbox"
                  onChange={() => {
                    dispatch(
                      editDeliveryPerson({
                        qb_inv_no: invId,
                        delivery_person_id: e.id,
                      })
                    ).then((e) => {
                      if (e.type === "editDeliveryPerson/fulfilled") {
                        setShow(false);
                        setRecall((prev) => {
                          return !prev;
                        });
                      }
                    });
                  }}
                  className={`w-6 h-6 accent-blue ${
                    selected !== e.id && 'outline outline-3 outline-darkGray -outline-offset-2'
                  }`}
                />
                <label htmlFor={e.id} className="font-semibold text-md">
                  {e.name}
                </label>
              </li>
            );
          })}
        </ul>
        <Button className="px-12" onClick={() => setShow(false)}>
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default DeliveryModal;
