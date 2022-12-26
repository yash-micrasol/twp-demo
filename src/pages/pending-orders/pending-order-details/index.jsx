import React, { useEffect, useState } from 'react';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import Button from '../../../components/Button';
import { SimpleHeader } from '../../../components/headers';
import Loader from '../../../components/Loader';
import { getPendingOrderDetails } from '../../../store/pending-orders/slice';
import EditDate from "../../../components/EditDate";
import { editDueDate } from '../../../store/invoice/slice';
import { formatDate } from '../../../helpers/constant';

const PendingOrderDetails = () => {
  const params = useParams();
  const invoice_number = params?.invoiceNumber;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { orderDetails: data, status } = useSelector((store) => store.pendingOrder);

  const shortName = data?.customer_name?.split(' ') ?? [];

  const [recall, setRecall] = useState(false);

  useEffect(() => {
    if (invoice_number) {
      dispatch(getPendingOrderDetails({ invoice_number }));
    } else {
      navigate(-1);
    }
  }, [dispatch, invoice_number, navigate, recall]);

  return (
    <div>
      <SimpleHeader title={'Order Detail'} />
      {status === 'loading' ? (
        <Loader />
      ) : (
        <div className="p-3 space-y-2">
          <div className="bg-white rounded-md">
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
              <div className="p-4 space-y-2">
                <div className="space-y-2">
                  <span className="flex items-center justify-between">
                    <p>Order Date : {data?.invoice_date}</p>
                    <p>${data?.total_amount}</p>
                  </span>
                  <p>Placed By : {data?.order_by}</p>

                  <span className="flex items-center space-x-3">
                    <p>Pref. Delivery Date : {data?.delivery_date}</p>
                    <EditDate
                      date={new Date(data?.invoice_date ?? null)}
                      onChange={(e) => {
                        dispatch(
                          editDueDate({
                            date: formatDate(e),
                            date_type: "order",
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
                  <p>Delivery Person : {data?.order_delivery_person?.name ?? '-'}</p>

                  {/* delivered */}
                  {data?.picked_status === 'delivered' && (
                    <>
                      <span className="flex items-center justify-between">
                        <p>
                          Status :{' '}
                          <span className="capitalize text-green"> {data?.picked_status} </span>
                        </p>
                        <Button className="px-1.5 py-2">
                          Delivered
                          <FontAwesomeIcon icon={faCircleCheck} className="w-4 h-4 mx-1" />
                        </Button>
                      </span>
                      <p>QB No : {data?.qb_inv_number}</p>
                    </>
                  )}

                  <p>Note : {data?.note ?? '-'}</p>
                </div>
              </div>
            </div>
          </div>

          {data?.items?.length > 0 && (
            <div className="shadow-md rounded-b-md">
              <p className="px-3 py-5 text-lg font-semibold bg-gray-200 text-blue rounded-t-md">
                Ordered Items
              </p>
              <ul>
                {data.items.map((e, key) => {
                  return (
                    <li key={key} className="p-3 space-y-2 even:bg-gray-200 last:rounded-b-md">
                      <p className="font-semibold">{e.item}</p>
                      <span className="flex justify-between">
                        <p>
                          {e.quantity} @ {e.sales_price}
                        </p>
                        <p>${e.amount}</p>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PendingOrderDetails;
