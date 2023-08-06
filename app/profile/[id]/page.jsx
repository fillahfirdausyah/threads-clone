'use client';

import PostCard from '@components/PostCard';
import Header from '@components/Header';
import Profile from '@components/Profile';

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
  }, [session]);

  return (
    <>
      {threads.map((thread) => (
        <PostCard key={thread.id} post={thread} />
      ))}
    </>
  );
};

const ProfilePage = ({ params }) => {
  const { data: session } = useSession();
  const [userData, setUserData] = useState({
    bio: '',
    link: '',
  });

  useEffect(() => {
    const getUserDetail = async () => {
      const response = await fetch(
        `http://localhost:5000/v1/users/${session?.user.username}`
      );
      const data = await response.json();
      setUserData({
        bio: data.data.bio,
        link: data.data.link,
      });
    };

    getUserDetail();
  }, []);
  return (
    <>
      <Header />
      <Profile
        userId={params.id}
        bio={userData.bio}
        link={userData.link}
        session={session}
      >
        <PostCardList />
      </Profile>
    </>
  );
};

export default ProfilePage;
