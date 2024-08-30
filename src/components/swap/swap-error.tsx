import React from 'react';

interface SwapErrorProps {
  message: string;
  severity?: 'error' | 'critical'; // Added severity level
}

const getErrorStyle = (severity: 'error' | 'critical') => {
  switch (severity) {
    case 'critical':
      return 'bg-red-200 border-red-400 text-red-800'; // More intense color for critical errors
    case 'error':
    default:
      return 'bg-red-100 border-red-300 text-red-700';
  }
};

const SwapError: React.FC<SwapErrorProps> = ({ message, severity = 'error' }) => {
  const errorStyle = getErrorStyle(severity);

  return (
    <div
      role="alert"
      className={`p-4 border rounded-md ${errorStyle}`}
      aria-live="assertive"
    >
      <strong>{severity === 'critical' ? 'Critical Error' : 'Error'}:</strong> {message}
    </div>
  );
};

export default SwapError;
