import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import InfiniteScroll from 'react-infinite-scroll-component';

import CustomerCard from './components/CustomerCard';

import Loader from '../../components/Loader';
import MiniLoader from '../../components/MiniLoader';
import { SearchHeader } from '../../components/headers';
import { customerList, searchCustomer } from '../../store/customer/slice';

const Customer = () => {
  const dispatch = useDispatch();

  const { data } = useSelector((store) => store.customer);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  const [miniLoader, setMiniLoader] = useState(false);

  const common = () => {
    setPage(1);
    window.scrollTo(0, 0);
    setMiniLoader(true);
  };

  const offLoader = () => {
    setMiniLoader(false);
  };

  useEffect(() => {
    if (!isSearch) {
      common();
      dispatch(customerList({ page: 1 })).then(() => {
        offLoader();
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSearch]);

  useEffect(() => {
    if (isSearch && search !== '') {
      common();
      dispatch(searchCustomer({ page: 1, search })).then(() => {
        offLoader();
      });
    }
    if (isSearch && search === '') {
      common();
      dispatch(customerList({ page: 1 })).then(() => {
        offLoader();
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <div>
      <SearchHeader
        title={'Customer'}
        search={search}
        isSearch={isSearch}
        setSearch={setSearch}
        setIsSearch={setIsSearch}
        setPage={setPage}
      />

      {miniLoader ? (
        <Loader />
      ) : (
        <InfiniteScroll
          dataLength={data?.data?.length ?? 50}
          next={() => {
            setPage(page + 1);
            if (search !== '') {
              dispatch(searchCustomer({ page: page + 1, search }));
            } else {
              dispatch(customerList({ page: page + 1 }));
            }
          }}
          loader={<MiniLoader />}
          hasMore={!(data?.current_page === data?.last_page || data?.total === 0)}
          className="space-y-1"
        >
          {!data?.data && <p className="text-darkGray text-center mt-12">No Data Found</p>}
          {(data?.data ?? []).map((e, key) => {
            return <CustomerCard key={key} data={e} />;
          })}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default Customer;
