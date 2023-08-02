import React from 'react';
import NotificationsCard from '@components/NotificationsCard';

const NotificationsPage = () => {
  return (
    <section className="mt-4 max-w-xl mx-auto px-3 mb-16 lg:mt-28 overflow-x-hidden">
      <div className="flex items-center">
        <h1 className="text-threads-white text-2xl font-semibold me-1">
          Notifications Center
        </h1>
        <p>🔔</p>
      </div>
      <div className="mt-5">
        <NotificationsCard notifications={{ type: 'likes', likesCount: 3 }} />
        <NotificationsCard notifications={{ type: 'comments' }} />
        <NotificationsCard notifications={{ type: 'follower' }} />
      </div>
    </section>
  );
};

export default NotificationsPage;
