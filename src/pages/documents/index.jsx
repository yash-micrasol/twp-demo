import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { SearchHeader } from '../../components/headers';
import Loader from '../../components/Loader';
import MiniLoader from '../../components/MiniLoader';
import { getDocuments } from '../../store/documents/slice';
import DocumentsCard from './components/DocumentsCard';

const Documents = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isSearch, setIsSearch] = useState(false);

  const { data, status } = useSelector((store) => store.documents);

  useEffect(() => {
    dispatch(getDocuments({ search, page }));
  }, [dispatch, page, search]);

  return (
    <div>
      <SearchHeader
        title="Documents"
        search={search}
        isSearch={isSearch}
        setSearch={setSearch}
        setIsSearch={setIsSearch}
        setPage={setPage}
      />
      <p className="sticky p-3 text-lg bg-white text-blue">Document Categories</p>
      <div className="mt-2">
        {status === 'loading' ? (
          <Loader />
        ) : (
          <InfiniteScroll
            dataLength={data?.data?.length ?? 50}
            next={() => {
              setPage(page + 1);
            }}
            loader={<MiniLoader />}
            hasMore={!(data?.current_page === data?.last_page || data?.total === 0)}
            className="space-y-1"
          >
            {!data?.data && <p className="mt-12 text-center text-darkGray">No Data Found</p>}
            {(data?.data ?? []).map((e, key) => {
              return <DocumentsCard key={key} index={key} data={e} />;
            })}
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
};

export default Documents;
