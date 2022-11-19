import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import Input from "../../../components/Input";
import { setOrder } from "../../../store/customer/slice";

const NewOrderCard = ({ data, order, setViewData, setView }) => {
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  return (
    <>
      <div
        className={`${
          (order[data?.id]?.qty ?? 0) > 0 ? "bg-[#c8e6c9]" : "bg-gray-200"
        }  p-2 px-4 space-y-1 cursor-pointer`}
        onClick={() => {
          setView(true);
          setViewData(data);
        }}
      >
        <div className="flex flex-col justify-between items-center space-y-2">
          <div className="w-full flex justify-between">
            <span>
              <p className="font-semibold">{data?.item_name ?? ""}</p>
              <p className="font-semibold">
                Price: <span className="text-green">${data?.price ?? ""}</span>
              </p>
            </span>
            <span>
              <p
                className={`w-12 h-12 rounded-full ${
                  data?.qty_on_hands > 0 ? "bg-green" : "bg-pink"
                } text-white flex justify-center items-center`}
              >
                {data?.qty_on_hands}
              </p>
            </span>
          </div>

          <div className="w-full flex justify-between items-center">
            <Input
              min={0}
              ref={inputRef}
              name="qty"
              type="number"
              value={order[data?.id]?.qty ?? ""}
              placeholder="Quantity"
              className="p-2.5 border border-gray-300 outline-none rounded-md w-1/3 text-[14px]"
              onClick={(e) => {
                e.stopPropagation();
              }}
              onChange={(e) => {
                const value = e?.target?.value ?? 0;
                if (value === "" || value <= 0) {
                  delete order[data?.id];
                } else {
                  order[data?.id] = {
                    name: data?.item_name,
                    item_id: data?.id,
                    qty: parseInt(value),
                    price: data?.price,
                    totalPrice: value * data?.price,
                  };
                }
                dispatch(setOrder({ ...order }));
              }}
            />
            <p className="font-semibold">
              Total: $ {order[data?.id]?.totalPrice ?? 0}
            </p>
          </div>
        </div>

        {data?.qty_on_hands <= 0 && (
          <p className="font-light">
            Next Delivery Date: {data?.next_delivery_date}
          </p>
        )}
      </div>
    </>
  );
};

export default NewOrderCard;
