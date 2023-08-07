import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

const Profile = ({ children, userId, session, bio, link }) => {
  const [moreActionMenu, setMoreActionMenu] = useState(false);

  const handleLogout = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <section className="mt-4 max-w-xl mx-auto px-3 lg:mt-28 text-threads-white">
      <div className="flex w-full justify-between items-start">
        <div className="flex flex-col">
          <h1 className="font-bold text-2xl">
            {session?.user.fullname
              ? session?.user.fullname
              : session?.user.name}
          </h1>
          <p>
            @{session?.user.username}
            <span className="bg-threads-dark px-2 rounded-full text-sm text-threads-gray">
              threadsclone.net
            </span>
          </p>
          {bio && <p className="mt-4">{bio}</p>}
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
          {link !== 'undefined' ? (
            <p className="cursor-pointer">
              <Link href={`http://${link}`} target="_blank">
                {link}
              </Link>
            </p>
          ) : (
            <></>
          )}
        </div>
        <div
          className="flex flex-col items-center justify-between relative"
          onClick={() => setMoreActionMenu((prev) => !prev)}
        >
          <div className="bg-transparent flex justify-center items-center h-6 w-6 outline outline-2 rounded-full">
            <Image
              src={'/Assets/icon/Outline/Interface/Other-1.svg'}
              width={25}
              height={25}
              className="cursor-pointer"
            />
          </div>
          {moreActionMenu ? (
            <div className="absolute bg-threads-dark text-threads-white top-7 rounded-md w-44 p-3 right-0">
              <button
                type="button"
                className="text-red-500 h-full w-full text-start hover:text-red-400"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <> </>
          )}
        </div>
      </div>
      <div className="w-full flex gap-6 text-center mt-5">
        {session?.user.username === userId && (
          <>
            <Link
              href={`/profile/${session?.user.username}/setting`}
              className="bg-transparent outline outline-1 text-sm py-[0.4rem] px-7 rounded-md w-1/2 hover:bg-threads-purple-500 hover:outline-threads-purple-500"
            >
              Edit Profile
            </Link>
            <button className="bg-transparent outline outline-1 text-sm py-[0.4rem] px-7 rounded-md w-1/2 hover:bg-threads-purple-500 hover:outline-threads-purple-500">
              Share Profile
            </button>
          </>
        )}
        {session?.user.username !== userId && (
          <>
            <button className="bg-threads-purple-500 py-1 px-7 rounded-md w-full hover:bg-threads-purple-400">
              Follow
            </button>
            <button className="bg-transparent outline outline-1 py-1 px-7 rounded-md w-full hover:bg-threads-purple-500 hover:outline-threads-purple-500">
              Following
            </button>
          </>
        )}
      </div>
      <div className="mt-5 flex items-center text-center justify-between text-threads-gray gap-1">
        <div className="flex-1 py-3 tab-active cursor-pointer">
          <h1>Threads</h1>
        </div>
        <div className="flex-1 py-3 cursor-pointer border-b-[0.5px] border-b-threads-gray">
          <h1>Replies</h1>
        </div>
      </div>
      <section className="mb-16">{children}</section>
    </section>
  );
};

export default Profile;
