'use client';

import Header from '@components/Header';
import CoverPage from './cover/page';
import Feed from '@components/Feed';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { socket } from '@utils/socket';
import { useNotifications } from '@utils/context/notificationsContext';

const HomePage = () => {
  const { data: session } = useSession();
  const { addNotificationCounter, notificationsCounter } = useNotifications();

  useEffect(() => {
    if (session?.user) {
      socket.connect();
      socket.on('connect', () => {
        socket.emit('registerUserToSocket', session?.user.id);
        console.log('connected');
      });
      socket.on(`notification:${session?.user.id}`, () => {
        addNotificationCounter();
      });
    }
  }, [session, notificationsCounter]);

  return (
    <>
      {session?.user ? (
        <main className="text-threads-white">
          <Header />
          <div className="flex max-w-xl mx-auto relative">
            <Feed />
          </div>
        </main>
      ) : (
        <CoverPage />
      )}
    </>
  );
};

export default HomePage;
