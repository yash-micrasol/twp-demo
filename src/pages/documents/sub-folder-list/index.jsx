import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { SimpleHeader } from '../../../components/headers';
import Loader from '../../../components/Loader';
import MiniLoader from '../../../components/MiniLoader';
import { viewDocuments } from '../../../store/documents/slice';
import DocumentsListCard from '../components/DocumentsListCard';

const SubFolderList = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const folder_id = params?.folderId;

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
          <p className="p-3 font-semibold text-center shadow-md text-blue">
            Document For : {document?.data[0]?.folder_name ?? ""}
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
              <p className="mt-12 text-center text-darkGray">No Data Found</p>
            )}
            {(document?.data ?? []).map((e) => {
              return (e?.folde_wise_catalog_list ?? []).map((data, key) => {
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
