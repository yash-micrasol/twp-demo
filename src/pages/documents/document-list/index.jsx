import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { SimpleHeader } from "../../../components/headers";
import Loader from "../../../components/Loader";
import { getDocuments } from "../../../store/documents/slice";
import DocumentsListCard from "../components/DocumentsListCard";

const DocumentsList = () => {
  const params = useParams();
  const index = params.index;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, status } = useSelector((store) => store.documents);

  const [documentData, setDocumentData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!data) {
      dispatch(getDocuments({ search: "", page: 1 })).then((e) => {
        if (e.type === "getDocuments/fulfilled") {
          setDocumentData(e.payload?.response?.data[index]);
        }
      });
    } else {
      setDocumentData(data?.data[index]);
    }
    // const timer = setTimeout(() => {
    //   setIsLoading(false);
    // }, 100);
    // return () => {
    //   clearTimeout(timer);
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : documentData.folder_count > 0 ? (
        <div>
          <SimpleHeader title="Documents" />
          <ul className="mt-2 space-y-1 font-semibold">
            {(documentData?.category_sub_folder ?? []).map((e, key) => {
              return (
                <li
                  key={key}
                  className="flex items-center justify-between p-2 bg-gray-200 cursor-pointer"
                  onClick={() => navigate(`${e?.id}`)}
                >
                  <p>{e?.folder_name}</p>
                  <span className="flex items-center justify-center space-x-2">
                    <p className="flex items-center justify-center text-white rounded-full w-11 h-11 bg-blue">
                      {e?.count}
                    </p>
                    <FontAwesomeIcon icon={faAngleRight} className="w-5 h-5" />
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div>
          <SimpleHeader title="Documents" />

          {status === "loading" ? (
            <Loader />
          ) : (
            <div>
              <p className="p-3 font-semibold text-center shadow-md text-blue">
                Document For : {documentData?.category_name ?? ""}
              </p>

              <div className="space-y-1">
                {(documentData?.document_list ?? []).map((e, key) => {
                  return <DocumentsListCard key={key} data={e} />;
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
export default DocumentsList;
