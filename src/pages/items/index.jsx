import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { clear, filterItems, searchItems } from '../../store/items/slice';

import InfiniteScroll from 'react-infinite-scroll-component';

import ItemCard from './components/Card';

import Loader from '../../components/Loader';
import MiniLoader from '../../components/MiniLoader';
import { CommonHeader } from '../../components/headers';
import FilterItem from './components/FilterItem';

const Items = () => {
  const dispatch = useDispatch();

  const { data } = useSelector((store) => store.items);

  const [page, setPage] = useState(1);
  const [show, setShow] = useState(false);
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

    return () => {
      dispatch(clear());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <div>
      <CommonHeader
        title={"Items"}
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
      {miniLoader ? (
        <Loader />
      ) : (
        <InfiniteScroll
          dataLength={data?.data?.length ?? 50}
          next={() => {
            setPage(page + 1);
            if (search !== "") {
              dispatch(searchItems({ page: page + 1, search }));
            } else {
              dispatch(filterItems({ type: filterVal.value, page: page + 1 }));
            }
          }}
          loader={<MiniLoader />}
          hasMore={
            !(data?.current_page === data?.last_page || data?.total === 0)
          }
          className="space-y-1"
        >
          {!data?.data && (
            <p className="mt-12 text-center text-darkGray">No Data Found</p>
          )}
          {(data?.data ?? []).map((e, key) => {
            return <ItemCard key={key} data={e} />;
          })}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default Items;
