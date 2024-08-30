import React from 'react';

interface PayButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

const PayButton: React.FC<PayButtonProps> = ({ onClick, children, disabled = false, className = '' }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 bg-black-500 text-white rounded-lg hover:bg-black-600 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-200 ${className}`}
    >
      {children}
    </button>
  );
};

export default PayButton;
