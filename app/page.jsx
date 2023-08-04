'use client';
import Feed from '@components/Feed';

import Header from '@components/Header';

import { useSession } from 'next-auth/react';
import CoverPage from './cover/page';

const HomePage = () => {
  const { data: session } = useSession();
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
