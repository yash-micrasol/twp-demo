import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const EditDate = ({ date, onChange }) => {
  return (
    <label className="flex justify-center items-center px-3">
      <FontAwesomeIcon icon={faPen} className="text-blue w-3.5 h-3.5" />
      <DatePicker popperPlacement="" className="hidden" selected={date} onChange={onChange} />
    </label>
  );
};

export default EditDate;
