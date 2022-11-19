import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { CommonHeader } from '../../../components/headers';
import FilterItem from '../../items/components/FilterItem';
import MiniLoader from '../../../components/MiniLoader';
import Loader from '../../../components/Loader';
import { getInvoiceItems } from "../../../store/invoice/slice";
import NewItemCard from '../components/NewItemCard';
import NewItemFooter from '../components/NewItemFooter';
import ViewItemModal from '../components/ViewItemModal';

const AddItems = () => {
  const { state } = useLocation();
  const { invoice_number, invoice_id } = state;

  const { invoiceItemData: data, order: orderData } = useSelector((store) => store.invoice);
  const dispatch = useDispatch();

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
    common();
    dispatch(getInvoiceItems({ type: filterVal.value, invoice_number, page: 1, search })).then(
      () => {
        offLoader();
      }
    );
  }, [dispatch, filterVal, invoice_number, search]);

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
      <ViewItemModal show={view} data={viewData} setShow={setView} />
      <CommonHeader
        title={'Add Items'}
        setShow={setShow}
        search={search}
        isSearch={isSearch}
        setPage={setPage}
        setSearch={setSearch}
        setIsSearch={setIsSearch}
        filter={filterVal.name}
      />
      <FilterItem
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
              dispatch(
                getInvoiceItems({
                  type: filterVal.value,
                  invoice_number,
                  page: page + 1,
                  search
                })
              );
            }}
            loader={<MiniLoader />}
            hasMore={!(data?.current_page === data?.last_page || data?.total === 0)}
            className="pb-28 space-y-1">
            {(data?.data?.length ?? 0) <= 0 && (
              <p className="text-darkGray text-center mt-12">No Data Found</p>
            )}
            {(data?.data ?? []).map((e, key) => {
              return (
                <NewItemCard
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
      <NewItemFooter
        total={total}
        order={order}
        invoice_id={invoice_id}
        customer_id={state.customer_id}
      />
    </div>
  );
};

export default AddItems;
