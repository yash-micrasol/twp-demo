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
      <div className="relative flex justify-between items-center bg-white p-4 shadow-md">
        <FontAwesomeIcon
          icon={faAngleLeft}
          className="text-blue w-6 h-6 left-2"
          onClick={() => naviagate(-1)}
        />
        <p className="absolute left-1/2 -translate-x-1/2 text-black font-semibold text-lg">
          {title}
        </p>
        <div className="space-x-4">
          <FontAwesomeIcon
            icon={faSliders}
            className="text-blue w-6 h-6 left-2"
            onClick={() => {
              setShow(true);
              setIsSearch(false);
              setSearch('');
            }}
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="text-blue w-6 h-6 left-2"
            onClick={() => setIsSearch(!isSearch)}
          />
        </div>
      </div>
      {isSearch && (
        <div className="border-y border-gray-200 shadow-md p-3 space-x-4 flex justify-around items-center">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="text-blue w-6 h-6" />
          <Input
            type="text"
            name="search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder="Enter search text here"
            className="outline-none w-full h-full"
          />
          <FontAwesomeIcon
            icon={faXmark}
            className="text-blue w-8 h-8"
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
    if (isSearch) {
      searchInput.current.focus();
    }
  }, [isSearch]);

  return (
    <div className="w-full bg-white sticky top-0 space-y-2 z-[999]">
      <div className="relative flex justify-between items-center bg-white p-4 shadow-md mb-2">
        <FontAwesomeIcon
          icon={faAngleLeft}
          className="text-blue w-6 h-6 left-2"
          onClick={() => naviagate(-1)}
        />
        <p className="absolute left-1/2 -translate-x-1/2 text-black font-semibold text-lg">
          {title}
        </p>

        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="text-blue w-6 h-6 left-2"
          onClick={() => {
            setIsSearch(!isSearch);
          }}
        />
      </div>
      <div hidden={!isSearch}>
        <div className="border-y border-gray-200 shadow-md p-3 space-x-4 flex justify-around items-center ">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="text-blue w-6 h-6" />
          <Input
            id="searchInput"
            ref={searchInput}
            type="text"
            name="search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
            placeholder="Enter search text here"
            className="outline-none w-full h-full"
          />
          <FontAwesomeIcon
            icon={faXmark}
            className="text-blue w-8 h-8"
            onClick={() => {
              setSearch('');
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
      <div className="relative flex justify-between items-center bg-white p-4 shadow-md">
        <FontAwesomeIcon
          icon={faAngleLeft}
          className="text-blue w-6 h-6 left-2"
          onClick={() => naviagate(-1)}
        />
        <p className="absolute left-1/2 -translate-x-1/2 text-black font-semibold text-lg">
          {title}
        </p>
      </div>
    </div>
  );
};
