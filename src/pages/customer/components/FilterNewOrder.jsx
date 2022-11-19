import React from 'react';
import Input from '../../../components/Input';
import Modal from '../../../components/Modal';

const FilterNewOrder = ({ show, setShow, filterVal, setFilterVal, filterList, setPage }) => {
  return (
    <Modal show={show}>
      <p className="text-3xl p-4">Filters</p>
      <ul className="space-y-6 p-4">
        {filterList.map((e, key) => {
          return (
            <li key={key} className="flex space-x-3">
              <Input
                id={e.value}
                value={e.value}
                checked={filterVal.value === e.value}
                name="btnGroup"
                type="checkbox"
                onChange={() => {
                  setPage(1);
                  setFilterVal(e);
                  setShow(false);
                }}
                className={`w-6 h-6 accent-blue ${
                  filterVal?.value !== e.value &&
                  'outline outline-3 outline-darkGray -outline-offset-2'
                }`}
              />
              <label htmlFor={e.value} className="font-semibold text-md">
                {e.name}
              </label>
            </li>
          );
        })}
      </ul>
      <div className="flex justify-center items-center m-2">
        <button
          className="text-white text-xl py-3 px-8 bg-blue rounded-md"
          onClick={() => {
            setShow(false);
          }}
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default FilterNewOrder;
