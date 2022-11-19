import React from 'react';
import fileview from '../../../assets/fileview.png';

const DocumentsListCard = ({ data }) => {
  return (
    <div className="bg-gray-200 font-semibold p-2 flex justify-between items-center">
      <p>{data?.title}</p>
      <a href={data?.url} rel="noreferrer" target="_blank">
        <img src={fileview} alt="fileview" className="h-8" />
      </a>
    </div>
  );
};

export default DocumentsListCard;
