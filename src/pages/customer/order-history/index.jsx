import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { SimpleHeader } from '../../../components/headers';
import Loader from '../../../components/Loader';
import MiniLoader from '../../../components/MiniLoader';
import { GetRoute } from '../../../helpers/constant';
import { invoiceDetails } from '../../../store/customer/slice';
import OrderHistoryCard from '../components/OrderHistoryCard';

const OrderHistory = () => {
  const { state } = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { invData, status } = useSelector((store) => store.customer);

  const [page, setPage] = useState(1);

  const route = GetRoute();

  useEffect(() => {
    if (!state) {
      navigate(route);
    }
  }, [navigate, route, state]);

  const customer = invData?.customer_details;
  const invList = invData?.invoice_details;

  const shortName = customer?.customer_name?.split(" ") ?? [];

  const address1 = `${customer?.street1} ${
    customer?.street2 ? ", " + (customer?.street2 ?? "") : ""
  }`;
  const address2 = `${customer?.city}, ${customer?.state}, ${customer?.zip}`;

  useEffect(() => {
    dispatch(invoiceDetails({ ...state, page: 1 }));
  }, [dispatch, state]);

  return (
    <div className="">
      <SimpleHeader title="Order History" />
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
                {customer?.customer_name}
              </p>
              <p className="font-semibold text-white">{address1}</p>
              <p className="font-semibold text-white">{address2}</p>
            </span>
          </div>
          <p className="p-4 font-semibold border">{invList?.total} Invoices</p>
          <InfiniteScroll
            dataLength={invList?.data?.length ?? 50}
            next={() => {
              setPage(page + 1);
              dispatch(invoiceDetails({ ...state, page: page + 1 }));
            }}
            loader={<MiniLoader />}
            hasMore={
              !(
                invList?.current_page === invList?.last_page ||
                invList?.total === 0
              )
            }
            className="space-y-1"
          >
            {!invList?.data && (
              <p className="mt-12 text-center text-darkGray">No Data Found</p>
            )}

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
