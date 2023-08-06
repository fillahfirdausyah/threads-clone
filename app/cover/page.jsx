'use client';

import { signIn } from 'next-auth/react';
import { ThreadsLogo } from '@components/icons/ThreadsLogo';

const CoverPage = () => {
  return (
    <>
      <section className="cover min-h-screen max-w-xl mx-auto px-6 mt-2 text-center text-threads-white">
        <div className="flex items-center justify-center mt-10">
          <ThreadsLogo width={50} height={50} />
        </div>
        <h1 className="mt-32 text-[50px]">Welcome To Threads Clone</h1>
        <p className="mt-16 text-[20px] px-20 text-threads-gray">
          Let’s share what is in your mind with text based Social Media
        </p>

        <button
          type="button"
          onClick={() => signIn('google')}
          className="bg-threads-purple-500 w-40 h-10 px-3 py-1 rounded-md text-threads-white text-sm font-medium hover:bg-threads-purple-400 mt-16"
        >
          Let's Join
        </button>
      </section>
    </>
  );
};

export default CoverPage;
