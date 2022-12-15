import React from 'react';

const Modal = ({ children, show }) => {
  return show ? (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
        <div className="relative w-[90%] my-6 mx-auto max-w-[26rem]">
          {/*content*/}
          <div className="relative flex flex-col w-full p-2 space-y-2 bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
            {children}
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
    </>
  ) : null;
};

export default Modal;
