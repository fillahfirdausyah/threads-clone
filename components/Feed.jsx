'use client';

import PostCard from './PostCard';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const PostCardList = () => {
  const { data: session } = useSession();
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    const getThreads = async () => {
      const response = await fetch('http://localhost:5000/v1/threads');
      const data = await response.json();
      setThreads(data.data);
    };

    session?.user && getThreads();
  }, []);

  return (
    <div className="w-full mb-16 lg:mt-28">
      {threads.map((thread) => (
        <PostCard key={thread.id} post={thread} />
      ))}
    </div>
  );
};

const Feed = () => {
  return (
    <div className="w-full mb-16 lg:mt-28">
      <PostCardList />
    </div>
  );
};

export default Feed;
