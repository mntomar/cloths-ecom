import { useEffect } from 'react';

const Toast = ({ message, type = 'success', onClose = () => {} }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof onClose === 'function') {
        onClose();
      }
    }, 2000); //  Auto close after 2 sec

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-5 right-5 px-4 py-2 rounded shadow-lg text-white text-sm z-50 ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
      }`}
    >
      {message}
    </div>
  );
};

export default Toast;
