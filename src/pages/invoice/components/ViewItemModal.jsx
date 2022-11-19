import React from 'react';
import Button from '../../../components/Button';
import Modal from '../../../components/Modal';

const ViewItemModal = ({ show, data, setShow }) => {
  return (
    <Modal show={show}>
      <div className="font-semibold px-1 py-2 space-y-4">
        <p>{data?.item_name}</p>
        <hr />
        <p>{data?.description}</p>
        <hr />

        <div className="space-y-6">
          <span className="flex justify-start">
            <p className="w-1/2">Preferred Vendor :</p>
            <p className="w-1/2 text-green font-normal">{data?.preferred_vendor}</p>
          </span>
          <span className="flex justify-start">
            <p className="w-1/2">Price :</p>
            <p className="w-1/2 text-green font-normal">${data?.price}</p>
          </span>
          <span className="flex justify-start">
            <p className="w-1/2">Qty On Hand :</p>
            <p className="w-1/2 text-green font-normal">{data?.qty_on_hands}</p>
          </span>
          <span className="flex justify-start">
            <p className="w-1/2">Qty On Order :</p>
            <p className="w-1/2 text-green font-normal">{data?.qty_on_pur_order}</p>
          </span>
        </div>

        <div className="flex justify-center items-center pt-3">
          <Button className="px-8 py-3" onClick={() => setShow(false)}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ViewItemModal;
