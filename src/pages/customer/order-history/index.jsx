import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { SimpleHeader } from '../../../components/headers';
import Loader from '../../../components/Loader';
import MiniLoader from '../../../components/MiniLoader';
import { invoiceDetails } from '../../../store/customer/slice';
import OrderHistoryCard from '../components/OrderHistoryCard';

const OrderHistory = () => {
  const { state } = useLocation();

  const dispatch = useDispatch();

  const { invData, status } = useSelector((store) => store.customer);

  const [page, setPage] = useState(1);

  const customer = invData?.customer_details;
  const invList = invData?.invoice_details;

  const shortName = customer?.customer_name?.split(' ') ?? [];

  const address1 = `${customer?.street1} ${
    customer?.street2 ? ', ' + (customer?.street2 ?? '') : ''
  }`;
  const address2 = `${customer?.city}, ${customer?.state}, ${customer?.zip}`;

  useEffect(() => {
    dispatch(invoiceDetails({ ...state, page: 1 }));
  }, [dispatch, state]);

  return (
    <div className="">
      <SimpleHeader title="Order History" />
      {status === 'loading' ? (
        <Loader />
      ) : (
        <div className="m-3 rounded bg-white">
          <div className="w-full flex space-x-4 items-center bg-blue p-3 rounded-t-md">
            <span>
              <p className="bg-white text-blue text-4xl w-20 h-20 flex items-center justify-center rounded-full">
                {shortName[0]?.charAt(0)}
                {shortName[1]?.charAt(0)}
              </p>
            </span>
            <span className="space-y-1">
              <p className="text-white font-semibold">{customer?.customer_name}</p>
              <p className="text-white font-semibold">{address1}</p>
              <p className="text-white font-semibold">{address2}</p>
            </span>
          </div>
          <p className="p-4 border font-semibold">{invList?.total} Invoices</p>
          <InfiniteScroll
            dataLength={invList?.data?.length ?? 50}
            next={() => {
              setPage(page + 1);
              dispatch(invoiceDetails({ ...state, page: page + 1 }));
            }}
            loader={<MiniLoader />}
            hasMore={!(invList?.current_page === invList?.last_page || invList?.total === 0)}
            className="space-y-1"
          >
            {!invList?.data && <p className="text-darkGray text-center mt-12">No Data Found</p>}

            {(invList?.data ?? []).map((e, key) => {
              return <OrderHistoryCard key={key} data={e} />;
            })}
          </InfiniteScroll>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
