import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { faPen, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/Button";
import EditDate from "../../../components/EditDate";
import { SimpleHeader } from "../../../components/headers";
import Loader from "../../../components/Loader";
import {
  editDueDate,
  getDeliveryPersonList,
  invoiceDetail,
  markDelivered,
} from "../../../store/invoice/slice";
import DeliveryModal from "../components/DeliveryModal";
import QuantityModal from "../components/QuantityModal";
import { formatDate } from "../../../helpers/constant.js";

const InvoiceDetail = () => {
  const params = useParams();
  const invoice_number = params?.invoiceNumber;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [quantityData, setQuantityData] = useState({});
  const [deliveryShow, setDeliveryShow] = useState(false);
  const [quantityShow, setQuantityShow] = useState(false);

  const { invDetails: data, status } = useSelector((store) => store.invoice);

  const [recall, setRecall] = useState(true);

  const shortName = data?.customer_name?.split(" ") ?? [];

  useEffect(() => {
    dispatch(getDeliveryPersonList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(invoiceDetail({ invoice_number }));
  }, [dispatch, invoice_number, navigate, recall]);

  const getStatus = (type) => {
    switch (type) {
      case "ready_to_pick":
        return <p>Status : Ready To Pick</p>;
      case "partially_picked":
        return (
          <p>
            Status : <span className="text-orange">Partially Picked</span>
          </p>
        );
      case "fully_picked":
        return (
          <p>
            Status : <span className="text-green">Fully Picked</span>
          </p>
        );
      case "delivered":
        return (
          <p>
            Status : <span className="text-green">Delivered</span>
          </p>
        );
      default:
        return "";
    }
  };

  return (
    <div>
      <QuantityModal
        data={quantityData}
        show={quantityShow}
        setShow={setQuantityShow}
        setRecall={setRecall}
      />
      <DeliveryModal
        show={deliveryShow}
        setShow={setDeliveryShow}
        invId={data?.invoice_number}
        selected={data?.person_id}
        setRecall={setRecall}
      />
      <SimpleHeader title={"Invoice Detail"} />
      {status === "loading" ? (
        <Loader />
      ) : (
        <div className="m-3 bg-white rounded">
          <div className="flex items-center justify-start w-full p-2 space-x-4 bg-blue rounded-t-md">
            <span>
              <p className="flex items-center justify-center w-20 h-20 text-4xl bg-white rounded-full text-blue">
                {shortName[0]?.charAt(0)}
                {shortName[1]?.charAt(0)}
              </p>
            </span>
            <p className="font-semibold text-white">{data?.customer_name}</p>
          </div>

          <div className="border rounded-b-md">
            <div className="flex justify-between p-4">
              <p className="font-semibold">Inv. {data?.invoice_number}</p>
              <p className="">${data?.invoice_amount}</p>
            </div>
            <div className="p-4 space-y-2">
              <span className="flex items-center">
                <p>Due Date : {data?.invoice_date}</p>
                <EditDate
                  date={new Date(data?.invoice_date ?? null)}
                  onChange={(e) => {
                    dispatch(
                      editDueDate({
                        date: formatDate(e),
                        date_type: "invoice",
                        invoice_id: data?.id,
                        invoice_number: data?.invoice_number,
                      })
                    ).then((e) => {
                      if (e.type === "editDueDate/fulfilled") {
                        setRecall(!recall);
                      }
                    });
                  }}
                />
              </span>
              <span className="flex items-center gap-2">
                <p>Delivery Person : {data?.person_full_name}</p>
                <FontAwesomeIcon
                  icon={faPen}
                  className="text-blue w-3.5 h-3.5"
                  onClick={() => setDeliveryShow(true)}
                />
              </span>
              <p>Payment Type : {data?.payment_type}</p>
              <div className="flex items-center justify-between">
                {getStatus(data?.picked_status)}
                {data?.picked_status !==
                ("ready_to_pick" || "partially_picked") ? (
                  data?.picked_status === "fully_picked" ? (
                    <Button
                      className="px-1.5 py-2"
                      onClick={() => {
                        dispatch(
                          markDelivered({
                            invoice_number: data?.invoice_number,
                          })
                        ).then((e) => {
                          if (e.type === "markDelivered/fulfilled") {
                            setRecall(!recall);
                          }
                        });
                      }}
                    >
                      Mark as Delivered
                    </Button>
                  ) : data?.picked_status === "delivered" ? (
                    <Button className="px-1.5 py-2">
                      {data?.picked_status === ""}
                      Delivered
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        className="w-4 h-4 mx-1"
                      />
                    </Button>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>

          <div className="mt-3 space-y-4 bg-gray-200 border rounded">
            <span
              className="flex items-center justify-start p-4 space-x-2 text-lg font-semibold cursor-pointer text-blue"
              onClick={() => navigate(`${data?.id}`)}
            >
              <p className="">Items</p>
              <FontAwesomeIcon className="w-3.5 h-3.5" icon={faPlus} />
            </span>
            <ul hidden={!data?.items?.length}>
              {data?.items?.map((e, index) => {
                return (
                  <li
                    key={index}
                    className="p-4 space-y-2 odd:bg-gray-200 even:bg-white"
                  >
                    <p>{e?.item}</p>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <p>
                          {e?.quantity} @ {e?.sales_price}
                        </p>
                        <FontAwesomeIcon
                          icon={faPen}
                          onClick={() => {
                            setQuantityData({ ...e });
                            setQuantityShow(true);
                          }}
                          className="text-blue w-3.5 h-3.5"
                        />
                      </span>
                      <p>${e?.opening_balance}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceDetail;
