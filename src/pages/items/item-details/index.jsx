import React from 'react';
import { useLocation } from 'react-router-dom';
import { SimpleHeader } from '../../../components/headers';

const ItemDetails = () => {
  const { state } = useLocation();
  const { data } = state;

  return (
    <div>
      <SimpleHeader title="Item Details" />
      <div className="p-4 space-y-6 text-center text-darkGray">
        <div className="flex items-center justify-center font-semibold text-blue text-xl space-x-4 px-12">
          <hr className="w-1/2 border-blue" />
          <p>DETAILS</p>
          <hr className="w-1/2 border-blue" />
        </div>
        <p className="text-lg font-semibold">{data?.item_name}</p>
        <p className="px-4">{data?.description}</p>
        <p className="text-lg font-semibold">${data?.price}</p>
        <div className="text-start border border-blue rounded-md p-3 space-y-3">
          <span className="flex">
            <p className="w-1/2 font-semibold">Preferred Vendor :</p>
            <p className="w-1/2">{data?.preferred_vendor}</p>
          </span>
          <hr className="border-gray-300" />
          <span className="flex">
            <p className="w-1/2 font-semibold">Qty On Hand :</p>
            <p className="w-1/2">{data?.qty_on_hands}</p>
          </span>
          <hr className="border-gray-300" />
          <span className="flex">
            <p className="w-1/2 font-semibold">Qty On Order :</p>
            <p className="w-1/2">{data?.qty_on_pur_order}</p>
          </span>
        </div>
        <div className="flex justify-center items-center">
          <div className="bg-white w-40 h-40 rounded-md drop-shadow-lg" />
        </div>

        <div className="flex flex-col space-y-4 text-start">
          <span className="space-y-2">
            <p className="text-blue font-semibold text-lg">Shelf Talker (0)</p>
            <p className="text-gray-400 text-sm">Shelf Talker Not Available</p>
          </span>

          <span className="space-y-2">
            <p className="text-blue font-semibold text-lg">Tech Sheet (0)</p>
            <p className="text-gray-400 text-sm">Tech Sheet Not Available</p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
