'use client';
import NotificationsCard from '@components/NotificationsCard';

import { useNotifications } from '@utils/context/notificationsContext';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

const NotificationsPage = () => {
  const { data: session } = useSession();
  const { removeAllNotificationsCounter, notificationsCounter } =
    useNotifications();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const getNotifications = async () => {
      const response = await fetch(
        `http://localhost:5000/v1/notifications?user_id=${session?.user.id}`
      );
      const data = await response.json();
      setNotifications(data.data);
      removeAllNotificationsCounter();
    };

    session?.user && getNotifications();
  }, [session, notificationsCounter]);

  return (
    <section className="mt-4 max-w-xl mx-auto px-3 mb-16 lg:mt-28 overflow-x-hidden">
      <div className="flex items-center">
        <h1 className="text-threads-white text-2xl font-semibold me-1">
          Notifications Center
        </h1>
        <p>🔔</p>
      </div>
      <div className="mt-5">
        {notifications.map((notification) => (
          <NotificationsCard
            key={notification.id}
            notifications={notification}
          />
        ))}
        {/* <NotificationsCard notifications={{ type: 'likes', likesCount: 3 }} />
        <NotificationsCard notifications={{ type: 'comments' }} />
        <NotificationsCard notifications={{ type: 'follower' }} /> */}
      </div>
    </section>
  );
};

export default NotificationsPage;
