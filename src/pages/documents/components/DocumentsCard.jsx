import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const DocumentsCard = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-gray-200 flex justify-between items-center p-2 cursor-pointer"
      onClick={() => {
        if (data?.folder_count > 0) {
          navigate('sub-folder', {
            state: {
              data: data?.category_sub_folder,
              title: data?.category_name
            }
          });
        } else {
          navigate('document-list', {
            state: {
              data: data?.document_list,
              title: data?.category_name
            }
          });
        }
      }}
    >
      <span className="flex justify-center items-center space-x-2">
        <p className="text-lg font-semibold">{data?.category_name}</p>
        {data?.sub_folder === 'True' && <p className="w-2.5 h-2.5 bg-orange rounded-full" />}
      </span>
      <span className="flex space-x-2 justify-center items-center">
        <p className="bg-blue w-11 h-11 rounded-full flex justify-center items-center text-white">
          {data?.document_count}
        </p>
        <FontAwesomeIcon icon={faAngleRight} className="w-5 h-5" />
      </span>
    </div>
  );
};

export default DocumentsCard;
