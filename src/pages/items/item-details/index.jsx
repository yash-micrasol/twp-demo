import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SimpleHeader } from "../../../components/headers";

const ItemDetails = () => {
  const { state } = useLocation();
  const data = state?.data ?? {};
  const navigate = useNavigate();

  useEffect(() => {
    if (!state) {
      navigate("/items");
    }
  }, [navigate, state]);

  return (
    <div>
      <SimpleHeader title="Item Details" />
      <div className="p-4 space-y-6 text-center text-darkGray">
        <div className="flex items-center justify-center px-12 space-x-4 text-xl font-semibold text-blue">
          <hr className="w-1/2 border-blue" />
          <p>DETAILS</p>
          <hr className="w-1/2 border-blue" />
        </div>
        <p className="text-lg font-semibold">{data?.item_name}</p>
        <p className="px-4">{data?.description}</p>
        <p className="text-lg font-semibold">${data?.price}</p>
        <div className="p-3 space-y-3 border rounded-md text-start border-blue">
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
        <div className="flex items-center justify-center">
          <div className="w-40 h-40 bg-white rounded-md drop-shadow-lg" />
        </div>

        <div className="flex flex-col space-y-4 text-start">
          <span className="space-y-2">
            <p className="text-lg font-semibold text-blue">Shelf Talker (0)</p>
            <p className="text-sm text-gray-400">Shelf Talker Not Available</p>
          </span>

          <span className="space-y-2">
            <p className="text-lg font-semibold text-blue">Tech Sheet (0)</p>
            <p className="text-sm text-gray-400">Tech Sheet Not Available</p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
