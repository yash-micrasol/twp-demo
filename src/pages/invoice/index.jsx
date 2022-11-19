import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import InfiniteScroll from 'react-infinite-scroll-component';
import { getDeliveryPersonList, invoiceData, searchInvoice } from '../../store/invoice/slice';

import ItemCard from './components/Card';

import Loader from '../../components/Loader';
import MiniLoader from '../../components/MiniLoader';
import IsLoadingHOC from '../../components/IsLoadingHOC';
import { CommonHeader } from '../../components/headers';
import FilterInvoice from './components/FilterModal';

const Invoice = ({ setLoading }) => {
  const dispatch = useDispatch();

  const { data, deliveryPersonList } = useSelector((store) => store.invoice);

  const [page, setPage] = useState(1);
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  const [miniLoader, setMiniLoader] = useState(false);
  const [repList, setRepList] = useState([]);
  const [personList, setPersonList] = useState([]);

  const orderDueList = [
    { label: 'All', value: 'all' },
    { label: 'Today', value: 'today' },
    { label: 'Tomorrow', value: 'tomorrow' },
    { label: 'This Week', value: 'week' },
    { label: 'This Month', value: 'month' }
  ];

  const [filter, setFilter] = useState({
    filter_value: orderDueList[0],
    delivery_person_id: personList[0],
    rep_id: repList[0]
  });

  const common = () => {
    setPage(1);
    window.scrollTo(0, 0);
    setMiniLoader(true);
  };

  const offLoader = () => {
    setLoading(false);
    setMiniLoader(false);
  };

  useEffect(() => {
    dispatch(getDeliveryPersonList());
  }, [dispatch]);

  useEffect(() => {
    const tempRep = (deliveryPersonList?.rep_list ?? [])?.map((e) => {
      return {
        value: e.id,
        label: e.full_name,
        initials: e.full_name.charAt(0)
      };
    });
    const tempPerson = (deliveryPersonList?.person_list ?? [])?.map((e) => {
      return { ...e, value: e.id, label: e.name };
    });
    setRepList([{ label: 'All', value: null, initials: 'AL' }, ...tempRep]);
    setPersonList([{ label: 'All', value: null, initials: 'AL' }, ...tempPerson]);
  }, [deliveryPersonList]);

  useEffect(() => {
    if (!isSearch) {
      common();
      dispatch(
        invoiceData({
          page: 1,
          filter_value: filter?.filter_value?.value,
          delivery_person_id: filter?.delivery_person_id?.value ?? null,
          rep_id: filter?.rep_id?.value ?? null
        })
      ).then(() => {
        offLoader();
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSearch, filter]);

  useEffect(() => {
    if (isSearch && search !== '') {
      common();
      setFilter({
        filter_value: orderDueList[0],
        delivery_person_id: personList[0],
        rep_id: repList[0]
      });
      dispatch(searchInvoice({ type: 'invoice', page: 1, search })).then(() => {
        offLoader();
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <div>
      <CommonHeader
        title={'Open Invoices'}
        setShow={setShow}
        search={search}
        isSearch={isSearch}
        setPage={setPage}
        setSearch={setSearch}
        setIsSearch={setIsSearch}
      />
      <FilterInvoice
        show={show}
        filter={filter}
        repList={repList}
        personList={personList}
        orderDueList={orderDueList}
        setShow={setShow}
        setPage={setPage}
        setFilter={setFilter}
      />
      {miniLoader ? (
        <Loader />
      ) : (
        <InfiniteScroll
          dataLength={data?.data?.length ?? 50}
          next={() => {
            setPage(page + 1);
            dispatch(invoiceData({ page: page + 1 }));
          }}
          loader={<MiniLoader />}
          hasMore={!(data?.current_page === data?.last_page || data?.total === 0)}
          className="space-y-1 my-2"
        >
          {!data?.data && <p className="text-darkGray text-center mt-12">No Data Found</p>}
          {(data?.data ?? []).map((e, key) => {
            return <ItemCard key={key} data={e} />;
          })}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default IsLoadingHOC(Invoice);
