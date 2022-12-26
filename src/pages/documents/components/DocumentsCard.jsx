import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const DocumentsCard = ({ data, index }) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex items-center justify-between p-2 bg-gray-200 cursor-pointer"
      onClick={() => {
        // if (data?.folder_count > 0) {
        //   navigate("sub-folder", {
        //     state: {
        //       data: data?.category_sub_folder,
        //       title: data?.category_name,
        //     },
        //   });
        // } else {
        navigate(`${index}`);
        // }
      }}
    >
      <span className="flex items-center justify-center space-x-2">
        <p className="text-lg font-semibold">{data?.category_name}</p>
        {data?.sub_folder === "True" && (
          <p className="w-2.5 h-2.5 bg-orange rounded-full" />
        )}
      </span>
      <span className="flex items-center justify-center space-x-2">
        <p className="flex items-center justify-center text-white rounded-full bg-blue w-11 h-11">
          {data?.document_count}
        </p>
        <FontAwesomeIcon icon={faAngleRight} className="w-5 h-5" />
      </span>
    </div>
  );
};

export default DocumentsCard;
