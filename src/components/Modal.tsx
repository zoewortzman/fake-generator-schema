import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-50">
      <div className="relative bg-white p-6 rounded shadow-lg mt-[100px] max-h-[80vh] overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default Modal;
