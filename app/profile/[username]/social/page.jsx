'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import SocialCard from '@components/SocialCard';

const SocialPage = ({ params }) => {
  const { data: session } = useSession();
  const [tabActive, setTabActive] = useState('Followers');
  const [listResult, setListResult] = useState([]);
  const [followersCount, setFollowersCount] = useState(0);
  const [fetchingData, setFetchingData] = useState(false);

  useEffect(() => {
    const getListResult = async () => {
      const response = await fetch(
        `http://localhost:5000/v1/${tabActive}/${params.username}?sessionUserId=${session?.user.id}`
      );
      const data = await response.json();
      setListResult(data.data);
      setFollowersCount(data.data.length);
    };

    getListResult();
  }, [tabActive, fetchingData]);

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
    <section className="mt-4 max-w-xl mx-auto px-3 lg:mt-28 text-threads-white">
      <nav className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-base font-semibold">{params.username}</h1>
        </div>
        <button>Sort</button>
      </nav>
      <div className="mt-5 tab">
        <div
          onClick={() => setTabActive('Followers')}
          className={
            tabActive === 'Followers'
              ? 'tab-item cursor-pointer tab-active'
              : 'tab-item cursor-pointer'
          }
        >
          <h1>Followers</h1>
        </div>
        <div
          onClick={() => setTabActive('Following')}
          className={
            tabActive === 'Following'
              ? 'tab-item cursor-pointer tab-active'
              : 'tab-item cursor-pointer'
          }
        >
          <h1>Following</h1>
        </div>
      </div>
      <div>
        <h1 className="text-sm font-semibold mt-3">{followersCount} people</h1>
      </div>
      <div className="flex items-center gap-2 mt-5">
        <input
          type="text"
          placeholder="Search"
          className="bg-threads-dark rounded-md w-full py-1 px-3 text-threads-white"
        />
      </div>
      <section className="mb-16 mt-5">
        {listResult.map((user) => (
          <SocialCard
            key={user._id}
            user={
              tabActive === 'Followers' ? user.follower_user_id : user.user_id
            }
            isFollowing={user.isFollowing}
            handleFollow={handleFollow}
            handleUnfollow={handleUnfollow}
          />
        ))}
      </section>
    </section>
  );
};

export default SocialPage;
