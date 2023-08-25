import React, { useState, useEffect } from 'react'
import s from './NotificationComponent.module.css'

interface Toast {
  id: number
  message: string
}

const NotificationComponent: React.FC = () => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = (message: string) => {
    const newToast: Toast = {
      id: new Date().getTime(),
      message,
    };

    setToasts((prevToasts) => [...prevToasts, newToast])
    setTimeout(() => {
      removeToast(newToast.id);
    }, 8000);
  };

  const removeToast = (id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  };

  useEffect(() => {
    const handleCustomEvent = (event: any) => {addToast(event.detail.message)} 
    window.addEventListener('smartNotification', handleCustomEvent);
    return () => window.removeEventListener('smartNotification', handleCustomEvent)
  }, []);

  return (
    <div className={s.toastContainer}>
      {toasts.map((toast) => (
        <div key={toast.id} className={s.toast}>
          <div className={s.toastMessage}>{toast.message}</div>
          <button className={s.toastClose} onClick={() => removeToast(toast.id)}>
            &times;
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationComponent;