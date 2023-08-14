'use client';

import PostCard from './PostCard';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const PostCardList = () => {
  const { data: session } = useSession();
  const [threads, setThreads] = useState([]);
  const [fetchingData, setFetchingData] = useState(false);

  useEffect(() => {
    const getThreads = async () => {
      const response = await fetch(
        `http://localhost:5000/v1/threads?sessionUserId=${session?.user.id}`
      );
      const data = await response.json();
      setThreads(data.data);
    };

    session?.user && getThreads();
  }, [fetchingData]);

  const handleLikeThread = async (threadId) => {
    const userId = session?.user.id;
    await fetch(`http://localhost:5000/v1/threads/${threadId}/likes`, {
      method: 'POST',
      headers: new Headers({
        Accept: '*/*',
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({ userId }),
    });
    setFetchingData((prev) => !prev);
  };

  const handleUnlikeThread = async (threadId) => {
    const userId = session?.user.id;
    await fetch(`http://localhost:5000/v1/threads/${threadId}/likes`, {
      method: 'DELETE',
      headers: new Headers({
        Accept: '*/*',
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({ userId }),
    });
    setFetchingData((prev) => !prev);
  };

  const handleDeleteThread = async (threadId) => {
    await fetch(`http://localhost:5000/v1/threads/${threadId}`, {
      method: 'DELETE',
      headers: new Headers({
        Accept: '*/*',
        'Content-Type': 'application/json',
      }),
    });
    setFetchingData((prev) => !prev);
  };

  return (
    <div className="w-full mb-16 lg:mt-12">
      {threads.map((thread) => (
        <div className='post-separator'>
          <PostCard
            key={thread.id}
            handleLikeThread={handleLikeThread}
            handleUnlikeThread={handleUnlikeThread}
            handleDeleteThread={handleDeleteThread}
            post={thread}
          />
        </div>
      ))}
    </div>
  );
};

const Feed = () => {
  return (
    <div className="w-full mb-16 lg:mt-4">
      <PostCardList />
    </div>
  );
};

export default Feed;
