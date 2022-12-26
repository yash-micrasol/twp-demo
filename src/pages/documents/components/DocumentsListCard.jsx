import React from 'react';
import fileview from '../../../assets/fileview.webp';

const DocumentsListCard = ({ data }) => {
  return (
    <div className="flex items-center justify-between p-2 font-semibold bg-gray-200">
      <p>{data?.title}</p>
      <a href={data?.url} rel="noreferrer" target="_blank">
        <img src={fileview} alt="fileview" className="h-8" />
      </a>
    </div>
  );
};

export default DocumentsListCard;
