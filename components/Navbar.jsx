'use client';

import Image from 'next/image';
import Link from 'next/link';

import { usePathname } from 'next/navigation';
import { HomeIcon } from './icons/HomeIcon';
import { NotificationIcon } from './icons/NotificationIcon';
import { AddIcon } from './icons/AddIcon';
import { FireIcon } from './icons/FireIcon';
import { ThreadsLogo } from './icons/ThreadsLogo';
import { SearchIcon } from './icons/SearchIcon';
import { useSession } from 'next-auth/react';
import { useNotifications } from '@utils/context/notificationsContext';

const Navbar = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const { notificationsCounter } = useNotifications();

  return (
    <>
      {session?.user && (
        <nav className="w-full">
          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center justify-between px-4 py-3 border-b-[1px] border-opacity-60 border-b-white fixed top-0 left-0 right-0 z-10 bg-threads-bg">
            {/* Brand Image */}
            <div className="flex items-center gap-2">
              <ThreadsLogo width={30} height={30} />
              <h1 className="font-semibold text-threads-white text-lg">
                Threads Clone
              </h1>
            </div>

            {/* Search Input */}
            <div className="flex items-center my-0 ms-28 max-w-xl">
              <input
                type="text"
                className="bg-threads-dark px-4 py-2 w-[36rem] h-10  text-threads-white rounded-md focus:outline-none"
                placeholder="Search"
              />
            </div>

            {/* Nav Link and User area */}
            <div className="flex justify-between w-72">
              <Link href={'/'}>
                <HomeIcon
                  width={30}
                  height={30}
                  color={pathname === '/' ? '#7F5AF0' : '#fff'}
                />
              </Link>
              <Link href={'/notifications'}>
                <NotificationIcon
                  width={30}
                  height={30}
                  color={pathname === '/notifications' ? '#7F5AF0' : '#fff'}
                />
              </Link>
              <Link href={'/new-threads'}>
                <AddIcon width={30} height={30} />
              </Link>
              <Link href={'/'}>
                <FireIcon width={30} height={30} />
              </Link>
              <Link href={`/profile/${session?.user.username}`}>
                <Image
                  src={session?.user.image}
                  width={35}
                  height={35}
                  className="rounded-full object-contain"
                />
              </Link>
            </div>
          </div>
          {/* Desktop Nav */}

          {/* Mobile Nav */}
          {pathname !== '/new-threads' && (
            <div className="md:hidden fixed z-10 bottom-0 right-0 left-0 w-full p-4  flex border-t-[1px] border-opacity-60 justify-between border-t-white bg-threads-bg">
              <Link href={'/'}>
                <HomeIcon
                  width={30}
                  height={30}
                  color={pathname === '/' ? '#7F5AF0' : '#fff'}
                />
              </Link>
              <Link href={'/search'}>
                <SearchIcon
                  width={30}
                  height={30}
                  color={pathname === '/search' ? '#7F5AF0' : '#fff'}
                />
              </Link>
              <Link href={'/new-threads'}>
                <AddIcon width={30} height={30} />
              </Link>
              <Link href={'/notifications'} className="relative">
                <NotificationIcon
                  width={30}
                  height={30}
                  color={pathname === '/notifications' ? '#7F5AF0' : '#fff'}
                />
                {notificationsCounter > 0 ? (
                  <div className="text-center absolute top-0 text-white text-xs w-4 h-4 bg-red-500 rounded-full">
                    {notificationsCounter}
                  </div>
                ) : (
                  <></>
                )}
              </Link>
              <Link href={`/profile/${session?.user.username}`}>
                <Image
                  src={session?.user.image}
                  width={35}
                  height={35}
                  className="rounded-full object-contain"
                />
              </Link>
            </div>
          )}
          {/* Mobile Nav */}
        </nav>
      )}
    </>
  );
};

export default Navbar;
