import React from 'react';

interface SwapInfoProps {
  message: string;
  type?: 'info' | 'success' | 'error' | 'warning'; // Added message types
}

const getMessageStyle = (type: 'info' | 'success' | 'error' | 'warning') => {
  switch (type) {
    case 'success':
      return 'bg-green-100 border-green-300 text-green-700';
    case 'error':
      return 'bg-red-100 border-red-300 text-red-700';
    case 'warning':
      return 'bg-yellow-100 border-yellow-300 text-yellow-700';
    case 'info':
    default:
      return 'bg-blue-100 border-blue-300 text-blue-700';
  }
};

const SwapInfo: React.FC<SwapInfoProps> = ({ message, type = 'info' }) => {
  const messageStyle = getMessageStyle(type);

  return (
    <div
      role="alert"
      className={`p-4 border rounded-md ${messageStyle}`}
      aria-live="assertive"
    >
      <strong>{type.charAt(0).toUpperCase() + type.slice(1)}:</strong> {message}
    </div>
  );
};

export default SwapInfo;
