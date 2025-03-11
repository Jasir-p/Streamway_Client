// ToastContext.js
import React, { createContext, useContext, useState } from 'react';

// Create the context
const ToastContext = createContext();

// Toast types
export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
  WARNING: 'warning',
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  // Add a new toast
  const addToast = (message, type = TOAST_TYPES.INFO, duration = 3000) => {
    const id = Date.now();
    setToasts(prevToasts => [...prevToasts, { id, message, type, duration }]);
    
    // Auto remove after duration
    setTimeout(() => {
      removeToast(id);
    }, duration);
    
    return id;
  };

  // Remove a toast by id
  const removeToast = (id) => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

// Custom hook to use the toast context
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  
  return {
    showToast: (message, type, duration) => context.addToast(message, type, duration),
    showSuccess: (message, duration) => context.addToast(message, TOAST_TYPES.SUCCESS, duration),
    showError: (message, duration) => context.addToast(message, TOAST_TYPES.ERROR, duration),
    showInfo: (message, duration) => context.addToast(message, TOAST_TYPES.INFO, duration),
    showWarning: (message, duration) => context.addToast(message, TOAST_TYPES.WARNING, duration),
  };
};

// Toast Container Component
const ToastContainer = () => {
  const { toasts, removeToast } = useContext(ToastContext);
  
  if (toasts.length === 0) return null;
  
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map(toast => (
        <Toast key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  );
};

// Individual Toast Component
const Toast = ({ toast, onClose }) => {
  const { message, type } = toast;
  
  // Get styles based on type
  const getToastStyles = () => {
    switch (type) {
      case TOAST_TYPES.SUCCESS:
        return 'bg-green-500 text-white';
      case TOAST_TYPES.ERROR:
        return 'bg-red-500 text-white';
      case TOAST_TYPES.WARNING:
        return 'bg-yellow-500 text-white';
      case TOAST_TYPES.INFO:
      default:
        return 'bg-blue-500 text-white';
    }
  };

  // Get icon based on type
  const getIcon = () => {
    switch (type) {
      case TOAST_TYPES.SUCCESS:
        return '✅';
      case TOAST_TYPES.ERROR:
        return '❌';
      case TOAST_TYPES.WARNING:
        return '⚠️';
      case TOAST_TYPES.INFO:
      default:
        return 'ℹ️';
    }
  };

  return (
    <div className={`rounded shadow-lg px-4 py-3 min-w-64 max-w-md flex items-center ${getToastStyles()}`}>
      <span className="mr-2">{getIcon()}</span>
      <p className="flex-grow">{message}</p>
      <button 
        onClick={onClose}
        className="ml-2 text-white hover:text-gray-200"
      >
        ✕
      </button>
    </div>
  );
};

export default ToastProvider;