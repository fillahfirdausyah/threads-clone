import React from 'react';
import NotificationsCard from '@components/NotificationsCard';

const NotificationsPage = () => {
  return (
    <section className="mt-4 max-w-xl mx-auto px-3 lg:mt-28">
      <h1 className="text-threads-white text-2xl font-semibold">
        Notifications Center
      </h1>
      <div className="mt-11">
        <NotificationsCard notifications={{ type: 'likes', likesCount: 3 }} />
        <NotificationsCard notifications={{ type: 'comments' }} />
        <NotificationsCard notifications={{ type: 'follower' }} />
      </div>
    </section>
  );
};

export default NotificationsPage;
