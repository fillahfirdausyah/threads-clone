"use client";

import PostCard from "@components/PostCard";
import Header from "@components/Header";
import Profile from "@components/Profile";
import Navbar from "@components/Navbar";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const PostCardList = ({ username }) => {
  const { data: session } = useSession();
  const [threads, setThreads] = useState([]);
  const [fetchingData, setFetchingData] = useState(false);

  useEffect(() => {
    const getThreads = async () => {
      const response = await fetch(
        `http://localhost:5000/v1/threads?username=${username}&sessionUserId=${session?.user.id}`,
      );
      const data = await response.json();
      setThreads(data.data);
    };

    session?.user && getThreads();
  }, [fetchingData]);

  /**
   * Handle like thread
   * @param {String} threadId
   */
  const handleLikeThread = async (threadId) => {
    const userId = session?.user.id;
    await fetch(`http://localhost:5000/v1/threads/${threadId}/likes`, {
      method: "POST",
      headers: new Headers({
        Accept: "*/*",
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({ userId }),
    });
    setFetchingData((prev) => !prev);
  };

  /**
   * Handle unlike thread
   * @param {String} threadId
   */
  const handleUnlikeThread = async (threadId) => {
    const userId = session?.user.id;
    await fetch(`http://localhost:5000/v1/threads/${threadId}/likes`, {
      method: "DELETE",
      headers: new Headers({
        Accept: "*/*",
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({ userId }),
    });
    setFetchingData((prev) => !prev);
  };

  /**
   * Handle delete thread
   * @param {String} threadId
   */
  const handleDeleteThread = async (threadId) => {
    await fetch(`http://localhost:5000/v1/threads/${threadId}`, {
      method: "DELETE",
      headers: new Headers({
        Accept: "*/*",
        "Content-Type": "application/json",
      }),
    });
    setFetchingData((prev) => !prev);
  };

  return (
    <>
      {threads.map((thread) => (
        <PostCard
          key={thread.id}
          handleDeleteThread={handleDeleteThread}
          handleLikeThread={handleLikeThread}
          handleUnlikeThread={handleUnlikeThread}
          post={thread}
        />
      ))}
    </>
  );
};

const ProfilePage = ({ params }) => {
  const { data: session } = useSession();
  const [fethingData, setFetchingData] = useState(false);
  const [userData, setUserData] = useState({
    fullname: "",
    username: "",
    bio: "",
    link: "",
    image: "",
    isFollowed: false,
    isFollowedMe: false,
    totalFollowers: 0,
  });

  useEffect(() => {
    const getUserDetail = async () => {
      const response = await fetch(
        `http://localhost:5000/v1/users/${params.username}?user_id=${session?.user.id}`,
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
        totalFollowers: data.data.totalFollowers,
      });
    };

    session?.user && getUserDetail();
  }, [session, fethingData]);

  const handleFollow = async (username) => {
    const userId = session?.user.id;
    await fetch(`http://localhost:5000/v1/follow/${username}`, {
      method: "POST",
      headers: new Headers({
        Accept: "*/*",
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({ userId }),
    });
    setFetchingData((prev) => !prev);
  };

  const handleUnfollow = async (username) => {
    const userId = session?.user.id;
    await fetch(`http://localhost:5000/v1/unfollow/${username}`, {
      method: "DELETE",
      headers: new Headers({
        Accept: "*/*",
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({ userId }),
    });
    setFetchingData((prev) => !prev);
  };

  return (
    <>
      <Navbar />
      <Header />
      <Profile
        username={params.username}
        type={session?.user.username === params.username ? "My" : "Other"}
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
