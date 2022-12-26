import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { SimpleHeader } from "../../../components/headers";
import Button from "../../../components/Button";
import Loader from "../../../components/Loader";
import { customerDetails, setOrder } from "../../../store/customer/slice";

const CustomerDetail = () => {
  const params = useParams();
  const customer_id = params?.id;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({});

  const { customer, status, customerData } = useSelector(
    (store) => store.customer
  );

  useEffect(() => {
    if (!customer && !customerData) {
      navigate("/customer");
    } else if (!customer) {
      setData(customerData);
    } else {
      setData(customer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customer]);

  const shortName = data?.customer_name?.split(" ") ?? [];

  const address1 = `${data?.street1 ?? ""} ${
    data?.street2 ? ", " + (data?.street2 ?? "") : ""
  }`;
  const address2 = `${data?.city ?? ""}, ${data?.state ?? ""}, ${
    data?.zip ?? ""
  }`;

  const ship_address = `${data?.ship_street1 ?? ""} ${
    data?.ship_street2 ? ", " : "" + (data?.street2 ?? "")
  } , ${data?.ship_city ?? ""}, ${data?.ship_state ?? ""}, ${
    data?.ship_zip ?? ""
  }`;

  useEffect(() => {
    if (customer_id) {
      dispatch(customerDetails({ customer_id }));
    } else {
      navigate("/customer");
    }
  }, [customer_id, dispatch, navigate]);

  return (
    <div>
      <SimpleHeader title={"Customer Details"} />
      {status === "loading" ? (
        <Loader />
      ) : (
        <div className="m-3 bg-white rounded">
          <div className="flex items-center w-full p-3 space-x-4 bg-blue rounded-t-md">
            <span>
              <p className="flex items-center justify-center w-20 h-20 text-4xl bg-white rounded-full text-blue">
                {shortName[0]?.charAt(0)}
                {shortName[1]?.charAt(0)}
              </p>
            </span>
            <span className="space-y-1">
              <p className="font-semibold text-white">
                {data?.customer_name ?? "-"}
              </p>
              <p className="font-semibold text-white">
                {data ? address1 : "-"}
              </p>
              <p className="font-semibold text-white">
                {data ? address2 : "-"}
              </p>
            </span>
          </div>
          <div className="p-3 space-y-3 border rounded-b-md">
            <p className="font-semibold">Shipping Details:</p>
            <p>{data ? ship_address : "-"}</p>
            <hr />
            <p className="font-semibold">Primary Contact:</p>
            <p>{data?.primary_contact_phone ?? "-"}</p>
            <hr />
            <p className="font-semibold">Liquor Id:</p>
            <p>{data?.liquor_id ?? "-"}</p>
            <hr />
            <p className="font-semibold">Payment Type:</p>
            <p>{data?.payment_type ?? "-"}</p>
            <hr />
            <p className="font-semibold">Note:</p>
            <p>{data?.note ?? "-"}</p>
          </div>
          <div className="flex items-center justify-between gap-6 m-3">
            <Button
              className="w-full"
              onClick={() => {
                navigate("new-order", {
                  state: {
                    customer_id,
                    email: data.email,
                    name: data?.customer_name,
                  },
                });
                dispatch(setOrder({}));
              }}
            >
              New Order
            </Button>
            <Button
              className="w-full"
              onClick={() => navigate("ordered-items")}
            >
              Order History
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerDetail;
