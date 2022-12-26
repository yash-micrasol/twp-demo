import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";

const PendingOrderCard = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex items-center justify-between p-2 px-4 bg-gray-200 cursor-pointer"
      onClick={() => navigate(`${data.invoice_number}`)}
    >
      <div className="space-y-1">
        <p className="font-semibold">{data?.customer_name}</p>
        <p>Order Date: {data?.invoice_date}</p>
        <p>Delivery Date: {data?.delivery_date}</p>
      </div>

      <div className="flex space-x-2 font-semibold text-darkGray">
        {data.status === "qb_inv_gene" && (
          <p className="flex items-center justify-center w-8 h-8 bg-white border border-black rounded-full">
            qb
          </p>
        )}
        {data.picked_status === "delivered" && (
          <p className="flex items-center justify-center w-8 h-8 bg-indigo-400 border border-black rounded-full">
            D
          </p>
        )}
      </div>

      <div className="flex items-center justify-center space-x-2">
        <p className="text-pink">Details</p>
        <FontAwesomeIcon icon={faAngleRight} className="w-5 h-5" />
      </div>
    </div>
  );
};

export default PendingOrderCard;
