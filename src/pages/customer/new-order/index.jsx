import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import InfiniteScroll from 'react-infinite-scroll-component';

import NewOrderCard from '../components/NewOrderCard';
import FilterNewOrder from '../components/FilterNewOrder';
import { filterItems, searchItems } from '../../../store/items/slice';
import { CommonHeader } from '../../../components/headers';
import Loader from '../../../components/Loader';
import MiniLoader from '../../../components/MiniLoader';
import { useLocation, useNavigate } from 'react-router-dom';
import NewOrderFooter from '../components/NewOrderFooter';
import ViewOrderModal from '../components/ViewOrderModal';

const NewOrder = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const navigate = useNavigate();

  const { data, orderData } = useSelector((store) => {
    return { data: store.items.data, orderData: store.customer.order };
  });

  const [page, setPage] = useState(1);
  const [show, setShow] = useState(false);
  const [total, setTotal] = useState(0);
  const [view, setView] = useState(false);
  const [viewData, setViewData] = useState({});
  const [order, setOrder] = useState({});
  const [search, setSearch] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  const [miniLoader, setMiniLoader] = useState(false);
  const [filterVal, setFilterVal] = useState({
    name: 'All Items',
    value: 'all'
  });

  const filterList = [
    { name: 'All Items', value: 'all' },
    { name: 'In Stock Items', value: 'inStock' },
    { name: 'No Stock Items', value: 'outStock' },
    { name: 'Oty On Order', value: 'otyOnOrder' },
    { name: 'New Items', value: 'new' }
  ];

  const common = () => {
    setPage(1);
    window.scrollTo(0, 0);
    setMiniLoader(true);
  };

  const offLoader = () => {
    setMiniLoader(false);
  };

  useEffect(() => {
    if (!state) {
      navigate(-1);
    }
  }, [navigate, state]);

  useEffect(() => {
    if (!isSearch) {
      common();
      dispatch(filterItems({ type: filterVal.value, page: 1 })).then(() => {
        offLoader();
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterVal, isSearch]);

  useEffect(() => {
    if (isSearch && search !== '') {
      common();
      dispatch(searchItems({ page: 1, search })).then(() => {
        offLoader();
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useEffect(() => {
    const temp = JSON.parse(JSON.stringify(orderData));
    setOrder(temp);
    setTotal(0);
    Object.values(orderData).map((e) => {
      setTotal((prev) => {
        return (prev += e.totalPrice);
      });
      return e;
    });
  }, [orderData]);

  return (
    <div className="min-h-screen">
      <ViewOrderModal show={view} data={viewData} setShow={setView} />
      <CommonHeader
        title={'New Order'}
        setShow={setShow}
        search={search}
        isSearch={isSearch}
        setPage={setPage}
        setSearch={setSearch}
        setIsSearch={setIsSearch}
        filter={`New Order For ${state?.name ?? ''}`}
        filterClass="text-center"
      />
      <FilterNewOrder
        show={show}
        setShow={setShow}
        setPage={setPage}
        filterList={filterList}
        filterVal={filterVal}
        setFilterVal={setFilterVal}
      />

      <div className="">
        {miniLoader ? (
          <Loader />
        ) : (
          <InfiniteScroll
            dataLength={data?.data?.length ?? 50}
            next={() => {
              setPage(page + 1);
              if (search !== '') {
                dispatch(searchItems({ page: page + 1, search }));
              } else {
                dispatch(filterItems({ type: filterVal.value, page: page + 1 }));
              }
            }}
            loader={<MiniLoader />}
            hasMore={!(data?.current_page === data?.last_page || data?.total === 0)}
            className="pb-28 space-y-1"
          >
            {!data?.data && <p className="text-darkGray text-center mt-12">No Data Found</p>}
            {(data?.data ?? []).map((e, key) => {
              return (
                <NewOrderCard
                  key={key}
                  data={e}
                  order={order}
                  setViewData={setViewData}
                  setView={setView}
                />
              );
            })}
          </InfiniteScroll>
        )}
      </div>

      <NewOrderFooter total={total} order={order} customer_id={state.customer_id} />
    </div>
  );
};

export default NewOrder;
