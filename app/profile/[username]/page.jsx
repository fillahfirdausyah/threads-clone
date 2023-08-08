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
  const [fethingData, setFetchingData] = useState(false);
  const [userData, setUserData] = useState({
    fullname: '',
    username: '',
    bio: '',
    link: '',
    image: '',
    isFollowed: false,
    isFollowedMe: false,
  });

  useEffect(() => {
    const getUserDetail = async () => {
      const response = await fetch(
        `http://localhost:5000/v1/users/${params.username}?user_id=${session?.user.id}`
      );
      const data = await response.json();
      setUserData({
        fullname: data.data.fullname,
        username: data.data.username,
        bio: data.data.bio,
        link: data.data.link,
        image: data.data.image,
        isFollowed: data.data.isFollowed,
        isFollowedMe: data.data.isFollowedMe,
      });
    };

    getUserDetail();
  }, [fethingData]);

  const handleFollow = async (username) => {
    const userId = session?.user.id;
    await fetch(`http://localhost:5000/v1/follow/${username}`, {
      method: 'POST',
      headers: new Headers({
        Accept: '*/*',
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({ userId }),
    });
    setFetchingData((prev) => !prev);
  };

  const handleUnfollow = async (username) => {
    const userId = session?.user.id;
    await fetch(`http://localhost:5000/v1/unfollow/${username}`, {
      method: 'DELETE',
      headers: new Headers({
        Accept: '*/*',
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({ userId }),
    });
    setFetchingData((prev) => !prev);
  };

  return (
    <>
      <Header />
      <Profile
        username={params.username}
        type={session?.user.username === params.username ? 'My' : 'Other'}
        data={userData}
        handleFollow={handleFollow}
        handleUnfollow={handleUnfollow}
      >
        <PostCardList username={params.username} />
      </Profile>
    </>
  );
};

export default ProfilePage;
