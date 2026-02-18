
import React from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
}

const Toast: React.FC<ToastProps> = ({ message, type }) => {
  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[200] animate-fade-in">
      <div className={`px-8 py-4 rounded-2xl shadow-2xl flex items-center space-x-3 text-white font-bold border-2 ${
        type === 'success' ? 'bg-green-600 border-green-500' : 'bg-blue-600 border-blue-500'
      }`}>
        <i className={`fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} text-xl`}></i>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Toast;
