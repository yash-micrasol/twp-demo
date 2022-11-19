import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRotateLeft, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/main_logo.png';
import { getDashboardData } from '../../store/dashboard/slice';
import { useDispatch } from 'react-redux';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const dispatch = useDispatch();
  const [isLogout, setIsLogout] = useState(false);
  return (
    <header className="flex justify-between items-center px-4 shadow-md w-full">
      <FontAwesomeIcon
        icon={faArrowRotateLeft}
        className="text-blue w-7 h-7"
        onClick={() => dispatch(getDashboardData())}
      />
      <img src={logo} alt="logo" className="w-1/2 h-24" />
      <FontAwesomeIcon icon={faPowerOff} onClick={setIsLogout} className="text-blue w-7 h-7" />
      <Logout isLogout={isLogout} setIsLogout={setIsLogout} />
    </header>
  );
};

const Footer = ({ data }) => {
  return (
    <footer className="bg-lightWhite w-full flex flex-col justify-center items-center p-1">
      <p className="text-blue font-medium">Privacy Policy</p>
      <p className="text-darkGray">Last Sync date : {data.last_sync_date}</p>
    </footer>
  );
};

const Logout = ({ isLogout, setIsLogout }) => {
  const navigate = useNavigate();
  return (
    <Modal show={isLogout}>
      <div className="p-3 space-y-12">
        <div className="space-y-4">
          <p className="text-3xl font-semibold">Logout</p>
          <p className="text-lg">Do you want to logout ?</p>
        </div>
        <div className="flex justify-end space-x-2 font-semibold">
          <Button
            color="white"
            className="py-3"
            onClick={() => {
              setIsLogout(false);
            }}
          >
            Cancel
          </Button>
          <Button
            className="border border-blue py-3"
            onClick={() => {
              setIsLogout(false);
              localStorage.clear();
              navigate('/login');
            }}
          >
            Logout
          </Button>
        </div>
      </div>
    </Modal>
  );
};

const DashBoardLayout = ({ children, data }) => {
  return (
    <div className="min-h-screen flex flex-col justify-between space-y-4">
      <Header />
      {children}
      <Footer data={data} />
    </div>
  );
};

export default DashBoardLayout;
