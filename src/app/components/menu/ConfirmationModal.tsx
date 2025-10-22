"use client";

import React from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }: ConfirmationModalProps) => {
  return (
    <>
      {isOpen && (
        <div className="ds-fixed ds-inset-0 ds-bg-black ds-bg-opacity-50 ds-flex ds-items-center ds-justify-center ds-z-50" onClick={onClose}>
          <div className="ds-card ds-p-6 ds-max-w-md ds-w-full ds-mx-4 ds-text-center" onClick={(e) => e.stopPropagation()}>
            <h2 className="ds-text-xl ds-font-bold ds-text-gray-900 ds-mb-4">Підтвердження</h2>
            <p className="ds-text-gray-700 ds-mb-6">{message}</p>
            <div className="ds-flex ds-justify-center ds-gap-3">
              <button 
                onClick={onClose} 
                className="ds-btn ds-btn-secondary"
              >
                Скасувати
              </button>
              <button 
                onClick={onConfirm} 
                className="ds-btn ds-btn-danger"
              >
                Видалити
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmationModal;