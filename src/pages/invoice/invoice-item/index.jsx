import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { SimpleHeader } from '../../../components/headers';
import { singleInvoiceData } from '../../../store/invoice/slice';
import Loader from '../../../components/Loader';
import newTag from '../../../assets/newItem.webp';
import { getStatus } from '../../../helpers/constant';

const InvoiceItem = () => {
  const params = useParams();
  const id = params?.id;
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { singleData: data, status } = useSelector((store) => store.invoice);

  const shortName = data?.customer_name?.split(' ') ?? [];

  useEffect(() => {
    dispatch(singleInvoiceData({ id }));
  }, [dispatch, id]);

  return (
    <div>
      <SimpleHeader title={"Invoices"} />
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
          <p className="p-4 font-semibold border">
            {data?.invoice_count} Invoices
          </p>
          <ul className="border border-t-0 rounded-b-md">
            {data?.invoices?.map((e, index) => {
              return (
                <li
                  key={index}
                  className="flex items-center justify-between gap-4 p-3 cursor-pointer even:bg-gray-200 last:rounded-b-md"
                  onClick={() => navigate(`${e?.invoice_number}`)}
                >
                  Inv. {e?.invoice_number} {e?.invoice_date}
                  <span className="flex gap-2">
                    {e?.new_invoice === 1 && (
                      <img
                        src={newTag}
                        alt="new"
                        className="w-[32px] h-[32px]"
                      />
                    )}
                    {getStatus(e?.picked_status)}
                    {e?.person_short_name ? (
                      <p className="flex items-center justify-center text-sm font-semibold text-white rounded-full bg-blue w-7 h-7">
                        {e?.person_short_name}
                      </p>
                    ) : null}
                  </span>
                  <span className="flex gap-4">
                    <p className="font-semibold text-pink">
                      ${e?.invoice_amount}
                    </p>
                    <FontAwesomeIcon icon={faAngleRight} className="w-5 h-5" />
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default InvoiceItem;
