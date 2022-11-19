import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SimpleHeader } from '../../../components/headers';

const SubFolder = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { data, title } = state;

  return (
    <div>
      <SimpleHeader title="Documents" />
      <ul className="mt-2 space-y-1 font-semibold">
        {data.map((e, key) => {
          return (
            <li
              key={key}
              className="flex justify-between items-center p-2 bg-gray-200 cursor-pointer"
              onClick={() =>
                navigate("list", {
                  state: { folder_id: e?.id, folder_name: title },
                })
              }
            >
              <p>{e?.folder_name}</p>
              <span className="flex items-center justify-center space-x-2">
                <p className="w-11 h-11 bg-blue text-white flex justify-center items-center rounded-full">
                  {e?.count}
                </p>
                <FontAwesomeIcon icon={faAngleRight} className="w-5 h-5" />
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SubFolder;
