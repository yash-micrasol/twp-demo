import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { SimpleHeader } from '../../../components/headers';
import { singleInvoiceData } from '../../../store/invoice/slice';
import Loader from '../../../components/Loader';
import newTag from '../../../assets/newItem.png';
import { getStatus } from '../../../helpers/constant';

const InvoiceItem = () => {
  const { state } = useLocation();
  const id = state?.id;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { singleData: data, status } = useSelector((store) => store.invoice);

  const shortName = data?.customer_name?.split(' ') ?? [];

  useEffect(() => {
    if (id) {
      dispatch(singleInvoiceData({ id }));
    } else {
      navigate('/invoice');
    }
  }, [dispatch, id, navigate]);

  return (
    <div>
      <SimpleHeader title={'Invoices'} />
      {status === 'loading' ? (
        <Loader />
      ) : (
        <div className="m-3 rounded bg-white">
          <div className="w-full flex justify-start space-x-4 items-center bg-blue p-2 rounded-t-md">
            <span>
              <p className="bg-white text-blue text-4xl flex justify-center items-center w-20 h-20 rounded-full">
                {shortName[0]?.charAt(0)}
                {shortName[1]?.charAt(0)}
              </p>
            </span>
            <p className="text-white font-semibold">{data?.customer_name}</p>
          </div>
          <p className="p-4 border font-semibold">{data?.invoice_count} Invoices</p>
          <ul className="border border-t-0 rounded-b-md">
            {data?.invoices?.map((e, index) => {
              return (
                <li
                  key={index}
                  className="flex justify-around items-center gap-4 p-3 even:bg-gray-200 last:rounded-b-md cursor-pointer"
                  onClick={() =>
                    navigate('invoice-details', {
                      state: { id, invoice_number: e?.invoice_number }
                    })
                  }
                >
                  Inv. {e?.invoice_number} {e?.invoice_date}
                  <span className="flex gap-2">
                    {e?.new_invoice === 1 && (
                      <img src={newTag} alt="new" className="w-[32px] h-[32px]" />
                    )}
                    {getStatus(e?.picked_status)}
                    <p className="text-white text-sm bg-blue w-7 h-7 flex justify-center items-center font-semibold rounded-full">
                      {e?.person_short_name}
                    </p>
                  </span>
                  <span className="flex gap-4">
                    <p className="text-pink font-semibold">${e?.invoice_amount}</p>
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
