import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SimpleHeader } from '../../../components/headers';

const SubFolder = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { data, title } = state;

  return <></>;
};

export default SubFolder;
