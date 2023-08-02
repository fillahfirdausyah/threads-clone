'use client';

import Image from 'next/image';

import PostCard from '@components/PostCard';
import Header from '@components/Header';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

const PostCardList = () => {
  const { data: session } = useSession();
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    const getThreads = async () => {
      const response = await fetch(
        `http://localhost:5000/v1/threads?username=${session?.user.username}`
      );
      const data = await response.json();
      setThreads(data.data);
    };

    getThreads();
  }, []);

  return (
    <>
      {threads.map((thread) => (
        <PostCard key={thread.id} post={thread} />
      ))}
    </>
  );
};

const ProfilePage = () => {
  const { data: session } = useSession();
  return (
    <>
      <Header />
      <section className="mt-4 max-w-xl mx-auto px-3 lg:mt-28 text-threads-white">
        <div className="flex w-full justify-between items-start">
          <div className="flex flex-col">
            <h1 className="font-bold text-2xl">{session?.user.name}</h1>
            <p>
              @{session?.user.username}
              <span className="bg-threads-dark px-2 rounded-full text-sm text-threads-gray">
                threadsclone.net
              </span>
            </p>
            <p className="mt-4">Kang Ngoding</p>
          </div>
          <Image
            src={session?.user.image}
            width={60}
            height={60}
            className="rounded-full object-contain"
          />
        </div>
        <div className="flex items-center justify-between mt-5 text-threads-gray">
          <div className="flex gap-1 text-sm">
            <p>123 Followers</p>
            <span className="text-threads-gray">•</span>
            <p className="cursor-pointer">itzy.com</p>
          </div>
          <div className="bg-transparent outline outline-2 rounded-full">
            <Image
              src={'/Assets/icon/Outline/Interface/Other-1.svg'}
              width={25}
              height={25}
              className="cursor-pointer"
            />
          </div>
        </div>
        <div className="mt-5 flex items-center text-center justify-between text-threads-gray gap-1">
          <div className="flex-1 py-3 tab-active cursor-pointer">
            <h1>Threads</h1>
          </div>
          <div className="flex-1 py-3 cursor-pointer border-b-[0.5px] border-b-threads-gray">
            <h1>Replies</h1>
          </div>
        </div>
        <section>
          <PostCardList />
        </section>
      </section>
    </>
  );
};

export default ProfilePage;
