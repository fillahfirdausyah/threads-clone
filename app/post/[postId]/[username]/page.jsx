'use client';

import HeaderNav from '@components/HeaderNav';
import Image from 'next/image';
import PostCard from '@components/PostCard';
import SinglePostCard from '@components/SinglePostCard';

import { SendIcon } from '@components/icons/SendIcon';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

const UserPostPage = ({ params }) => {
  const { data: session } = useSession();
  const [thread, setThread] = useState({});

  useEffect(() => {
    // Fetch post data
    const getSingleThread = async () => {
      const response = await fetch(
        `http://localhost:5000/v1/threads/${params.postId}?sessionUserId=${session?.user.id}`
      );
      const data = await response.json();
      setThread(data.data);
    };

    session?.user && getSingleThread();
  }, []);

  return (
    <>
      <HeaderNav title={'Thread'} type={'back'} />
      {/* Main Content */}
      <section className="max-w-xl mx-auto my-14">
        {thread?._id && (
          <SinglePostCard post={{ ...thread, repliesCount: 2 }} />
        )}
      </section>
      <div className="max-w-xl mx-auto fixed bottom-0 right-0 left-0 p-3 flex justify-between bg-threads-bg post-separator">
        <div className="flex gap-2 text-sm w-full bg-threads-dark p-1 rounded-lg">
          <Image
            src={session?.user.image}
            width={30}
            height={30}
            className="rounded-full"
          />
          <input
            type="text"
            className="w-full bg-transparent text-white placeholder-threads-gray border-none outline-none"
            placeholder="Write a comment..."
          />
          <button className="cursor-pointer">
            <SendIcon width={30} height={30} />
          </button>
        </div>
      </div>
    </>
  );
};

export default UserPostPage;
