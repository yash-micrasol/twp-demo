import React from 'react';
import { useLocation } from 'react-router-dom';
import { SimpleHeader } from '../../../components/headers';
import DocumentsListCard from '../components/DocumentsListCard';

const DocumentsList = () => {
  const { state } = useLocation();
  const { data, title } = state;

  return (
    <div>
      <SimpleHeader title="Documents" />

      <p className="p-3 text-blue font-semibold text-center shadow-md">Document For : {title}</p>

      <div className="space-y-1">
        {(data ?? []).map((e, key) => {
          return <DocumentsListCard key={key} data={e} />;
        })}
      </div>
    </div>
  );
};

export default DocumentsList;
