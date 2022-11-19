import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { SimpleHeader } from '../../../components/headers';
import Loader from '../../../components/Loader';
import MiniLoader from '../../../components/MiniLoader';
import { viewDocuments } from '../../../store/documents/slice';
import DocumentsListCard from '../components/DocumentsListCard';

const SubFolderList = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { folder_id,folder_name } = state;

  const { document, status } = useSelector((store) => store.documents);

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(viewDocuments({ folder_id, page }));
  }, [dispatch, folder_id, page]);

  return (
    <div>
      <SimpleHeader title="Documents" setPage={setPage} />

      {status === "loading" ? (
        <Loader />
      ) : (
        <>
          <p className="p-3 text-blue font-semibold text-center shadow-md">
            Document For : {folder_name ?? ""}
          </p>
          <InfiniteScroll
            dataLength={document?.data?.length ?? 50}
            next={() => {
              setPage(page + 1);
            }}
            loader={<MiniLoader />}
            hasMore={
              !(
                document?.current_page === document?.last_page ||
                document?.total === 0
              )
            }
            className="space-y-1"
          >
            {!document?.data && (
              <p className="text-darkGray text-center mt-12">No Data Found</p>
            )}
            {(document?.data ?? []).map((e) => {
              return e?.folde_wise_catalog_list.map((data, key) => {
                return <DocumentsListCard key={key} data={data} />;
              });
            })}
          </InfiniteScroll>
        </>
      )}
    </div>
  );
};

export default SubFolderList;
