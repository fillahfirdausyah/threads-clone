'use client';

import PostCard from '@components/PostCard';
import Header from '@components/Header';
import Profile from '@components/Profile';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

const PostCardList = ({ username }) => {
  const { data: session } = useSession();
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    const getThreads = async () => {
      const response = await fetch(
        `http://localhost:5000/v1/threads?username=${username}`
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
    fullname: '',
    username: '',
    bio: '',
    link: '',
    image: '',
  });

  useEffect(() => {
    const getUserDetail = async () => {
      const response = await fetch(
        `http://localhost:5000/v1/users/${params.username}`
      );
      const data = await response.json();
      setUserData({
        fullname: data.data.fullname,
        username: data.data.username,
        bio: data.data.bio,
        link: data.data.link,
        image: data.data.image,
      });
    };

    getUserDetail();
  }, []);
  return (
    <>
      <Header />
      <Profile
        username={params.username}
        type={session?.user.username === params.username ? 'My' : 'Other'}
        data={userData}
      >
        <PostCardList username={params.username} />
      </Profile>
    </>
  );
};

export default ProfilePage;
