import React, { useState } from 'react';
import Modal from '../../../components/Modal';
import Button from '../../../components/Button';
import CustomSelect from '../../../components/Select';

const FilterInvoice = ({
  show,
  filter,
  repList,
  personList,
  orderDueList,
  setShow,
  setPage,
  setFilter
}) => {
  const [temp, setTemp] = useState({ ...filter });
  return (
    <Modal show={show}>
      <div className="p-4">
        <div className="flex justify-between items-center">
          <p className="text-3xl font-semibold">Filters</p>
          <Button
            color="white"
            className="px-4 py-2"
            onClick={() => {
              setShow(false);
              setFilter({
                filter_value: orderDueList[0],
                delivery_person_id: personList[0],
                rep_id: repList[0]
              });
              setPage(0);
            }}
          >
            Reset
          </Button>
        </div>

        <hr className="my-6" />

        <div className="space-y-4 px-2 pb-4">
          <p className="font-semibold text-xl">Rep</p>
          <CustomSelect
            isLabel
            options={repList}
            value={temp.rep_id}
            onChange={(e) => {
              setTemp((prev) => {
                return { ...prev, rep_id: e };
              });
            }}
          />
          <p className="font-semibold text-xl">Delivery Person</p>
          <CustomSelect
            isLabel
            options={personList}
            value={temp.delivery_person_id}
            onChange={(e) => {
              setTemp((prev) => {
                return { ...prev, delivery_person_id: e };
              });
            }}
          />
          <p className="font-semibold text-xl">Order Due</p>
          <CustomSelect
            options={orderDueList}
            value={temp.filter_value}
            onChange={(e) => {
              setTemp((prev) => {
                return { ...prev, filter_value: e };
              });
            }}
          />
        </div>

        <div className="flex justify-center items-center space-x-6 m-2">
          <Button
            className="text-xl py-2"
            onClick={() => {
              setShow(false);
            }}
          >
            Close
          </Button>
          <Button
            className="text-xl py-2"
            onClick={() => {
              setShow(false);
              setPage(0);
              setFilter({ ...temp });
            }}
          >
            Submit
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default FilterInvoice;
