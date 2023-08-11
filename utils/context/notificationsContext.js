'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const NotificationsContext = createContext();

export const NotificationsProvider = ({ children }) => {
  const [notificationsCounter, setNotificationsCounter] = useState(0);

  useEffect(() => {
    if (notificationsCounter > 0) {
      document.title = `(${notificationsCounter}) - Threads App`;
    } else {
      document.title = 'Threads App';
    }
  }, [notificationsCounter]);

  const addNotificationCounter = () => {
    setNotificationsCounter(notificationsCounter + 1);
  };

  const removeAllNotificationsCounter = () => {
    setNotificationsCounter(0);
  };

  const contextValue = {
    notificationsCounter,
    addNotificationCounter,
    removeAllNotificationsCounter,
  };

  return (
    <NotificationsContext.Provider value={contextValue}>
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationsContext);
