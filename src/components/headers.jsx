import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleLeft,
  faMagnifyingGlass,
  faSliders,
  faXmark
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';

export const CommonHeader = ({
  search,
  setSearch,
  isSearch,
  setIsSearch,
  setShow,
  filter,
  filterClass = '',
  title
}) => {
  const naviagate = useNavigate();

  return (
    <div className="w-full bg-white sticky top-0 space-y-2 z-[999]">
      <div className="relative flex items-center justify-between p-4 bg-white shadow-md">
        <FontAwesomeIcon
          icon={faAngleLeft}
          className="w-6 h-6 text-blue left-2"
          onClick={() => naviagate(-1)}
        />
        <p className="absolute text-lg font-semibold text-black -translate-x-1/2 left-1/2">
          {title}
        </p>
        <div className="space-x-4">
          <FontAwesomeIcon
            icon={faSliders}
            className="w-6 h-6 text-blue left-2"
            onClick={() => {
              setShow(true);
              setIsSearch(false);
              setSearch('');
            }}
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="w-6 h-6 text-blue left-2"
            onClick={() => setIsSearch(!isSearch)}
          />
        </div>
      </div>
      {isSearch && (
        <div className="flex items-center justify-around p-3 space-x-4 border-gray-200 shadow-md border-y">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="w-6 h-6 text-blue" />
          <Input
            type="text"
            name="search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder="Enter search text here"
            className="w-full h-full outline-none"
          />
          <FontAwesomeIcon
            icon={faXmark}
            className="w-8 h-8 text-blue"
            onClick={() => {
              setSearch('');
              setIsSearch(false);
            }}
          />
        </div>
      )}
      {filter && <p className={`bg-white text-blue p-4 pt-2 ${filterClass}`}>{filter}</p>}
    </div>
  );
};

export const SearchHeader = ({ search, setSearch, isSearch, setIsSearch, title, setPage }) => {
  const naviagate = useNavigate();
  const searchInput = useRef(null);

  useEffect(() => {
    if (isSearch && !searchInput) {
      searchInput.current.focus();
    }
  }, [isSearch]);

  return (
    <div className="w-full bg-white sticky top-0 space-y-2 z-[999]">
      <div className="relative flex items-center justify-between p-4 mb-2 bg-white shadow-md">
        <FontAwesomeIcon
          icon={faAngleLeft}
          className="w-6 h-6 text-blue left-2"
          onClick={() => naviagate(-1)}
        />
        <p className="absolute text-lg font-semibold text-black -translate-x-1/2 left-1/2">
          {title}
        </p>

        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="w-6 h-6 text-blue left-2"
          onClick={() => {
            setIsSearch(!isSearch);
          }}
        />
      </div>
      <div hidden={!isSearch}>
        <div className="flex items-center justify-around p-3 space-x-4 border-gray-200 shadow-md border-y ">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="w-6 h-6 text-blue"
          />
          <Input
            id="search"
            ref={searchInput}
            type="text"
            name="search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
            placeholder="Enter search text here"
            className="w-full h-full outline-none"
          />
          <FontAwesomeIcon
            icon={faXmark}
            className="w-8 h-8 text-blue"
            onClick={() => {
              setSearch("");
              setIsSearch(false);
            }}
          />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export const SimpleHeader = ({ title }) => {
  const naviagate = useNavigate();

  return (
    <div className="w-full bg-white sticky top-0 space-y-2 z-[999]">
      <div className="relative flex items-center justify-between p-4 bg-white shadow-md">
        <FontAwesomeIcon
          icon={faAngleLeft}
          className="w-6 h-6 text-blue left-2"
          onClick={() => naviagate(-1)}
        />
        <p className="absolute text-lg font-semibold text-black -translate-x-1/2 left-1/2">
          {title}
        </p>
      </div>
    </div>
  );
};
