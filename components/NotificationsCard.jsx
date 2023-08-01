import React from 'react';

import Image from 'next/image';

import ReferNotificationsCard from './ReferNotificationsCard';

const NotificationsCard = ({ notifications }) => {
  return (
    <div className="flex justify-between items-start w-full gap-4 post-separator py-4 my-4">
      <Image
        src={'/Assets/img/user.png'}
        width={40}
        height={40}
        className="rounded-full object-contain"
      />
      {notifications.likesCount > 2 && (
        <Image
          src={'/Assets/img/user.png'}
          width={40}
          height={40}
          className="rounded-full object-contain ms-[-45px] mt-2"
        />
      )}
      <div className="flex flex-1 justify-between items-center">
        <div
          className={
            notifications.type === 'likes' || notifications.type === 'comments'
              ? 'flex flex-col items-start w-full'
              : 'flex flex-col items-start'
          }
        >
          <h1 className="text-threads-white font-semibold">PixelPilot4</h1>
          {notifications.type === 'follower' && (
            <p className="text-threads-white text-opacity-60">
              Followed you 2h ago
            </p>
          )}
          {notifications.type === 'likes' && (
            <>
              <p className="text-threads-white text-opacity-60">
                Likes your thread 2h ago
              </p>
              <ReferNotificationsCard />
            </>
          )}
          {notifications.type === 'comments' && (
            <>
              <p className="text-threads-white text-opacity-60">
                Comment your thread 2h ago
              </p>
              <ReferNotificationsCard />
            </>
          )}
        </div>
        {/* <button className="bg-transparent outline outline-1 outline-threads-purple px-4 py-1 rounded-md text-threads-white">
          Follow Back
        </button> */}
        {notifications.type === 'follower' && (
          <button className="bg-threads-purple-500 px-3 py-1 rounded-md text-threads-white text-sm font-medium hover:bg-threads-purple-400">
            Follow Back
          </button>
        )}
      </div>
    </div>
  );
};

export default NotificationsCard;
