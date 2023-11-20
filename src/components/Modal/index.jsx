import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <div
      className={`${
        isOpen ? "fixed inset-0 flex items-center justify-center" : "hidden"
      }`}
    >
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 bg-gray-800 text-white p-10 z-10 rounded-md w-96">
        <button
          onClick={onClose}
          className="text-red-700 hover:text-red-700 absolute top-2 right-2 text-2xl"
        >
          &times;
        </button>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
