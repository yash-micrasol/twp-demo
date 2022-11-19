import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { CommonHeader } from '../../components/headers';
import Loader from '../../components/Loader';
import MiniLoader from '../../components/MiniLoader';
import { getPendingOrder } from '../../store/pending-orders/slice';
import FilterPendingOrder from './components/FilterPendingOrder';
import PendingOrderCard from './components/PendingOrderCard';

const PendingOrders = () => {
  const dispatch = useDispatch();
  const [isSearch, setIsSearch] = useState(false);
  const [search, setSearch] = useState('');
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(1);

  const [filter, setFilter] = useState({
    name: 'All Items',
    value: 'all'
  });

  const filterList = [
    { name: 'All', value: 'all' },
    { name: 'Today', value: 'today' },
    { name: 'Tomorrow', value: 'tomorrow' },
    { name: 'This Week', value: 'week' },
    { name: 'This Month', value: 'month' }
  ];

  const { order, status } = useSelector((store) => store.pendingOrder);

  useEffect(() => {
    dispatch(getPendingOrder({ page, search, filter_value: filter.value }));
  }, [dispatch, filter, page, search]);

  return (
    <div>
      <CommonHeader
        title="Pending Orders"
        setShow={setShow}
        search={search}
        setSearch={setSearch}
        isSearch={isSearch}
        setIsSearch={setIsSearch}
      />
      <FilterPendingOrder
        show={show}
        filter={filter}
        setPage={setPage}
        setShow={setShow}
        setFilter={setFilter}
        filterList={filterList}
      />
      <div className="mt-2">
        {status === 'loading' ? (
          <Loader />
        ) : (
          <InfiniteScroll
            dataLength={order?.data?.length ?? 50}
            next={() => {
              setPage(page + 1);
            }}
            loader={<MiniLoader />}
            hasMore={!(order?.current_page === order?.last_page || order?.total === 0)}
            className="space-y-1"
          >
            {!order?.data && <p className="text-darkGray text-center mt-12">No Data Found</p>}
            {(order?.data ?? []).map((e, key) => {
              return <PendingOrderCard key={key} data={e} />;
            })}
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
};

export default PendingOrders;
