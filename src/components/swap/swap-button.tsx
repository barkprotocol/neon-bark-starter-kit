import React from 'react';

// Define the props type for SwapButton
interface SwapButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  ariaLabel?: string; // Optional aria-label for accessibility
}

const SwapButton: React.FC<SwapButtonProps> = ({ onClick, children, disabled = false, ariaLabel }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel} // Added aria-label for accessibility
      className={`p-2 bg-black-500 text-white rounded hover:bg-black-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-200`}
    >
      {children}
    </button>
  );
};

export default SwapButton;
