"use client";

import Image from "next/image";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { HomeIcon } from "./icons/HomeIcon";
import { NotificationIcon } from "./icons/NotificationIcon";
import { AddIcon } from "./icons/AddIcon";
import { FireIcon } from "./icons/FireIcon";
import { ThreadsLogo } from "./icons/ThreadsLogo";
import { SearchIcon } from "./icons/SearchIcon";
import { useSession } from "next-auth/react";
import { useNotifications } from "@utils/context/notificationsContext";

const Navbar = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const { notificationsCounter } = useNotifications();

  return (
    <>
      {session?.user && (
        <nav className="w-full">
          {/* Desktop Nav */}
          <div className="fixed left-0 right-0 top-0 z-10 hidden items-center justify-between border-b-[1px] border-b-white border-opacity-60 bg-threads-bg px-4 py-3 lg:flex">
            {/* Brand Image */}
            <div className="flex items-center gap-2">
              <ThreadsLogo width={30} height={30} />
              <h1 className="text-lg font-semibold text-threads-white">
                Threads Clone
              </h1>
            </div>

            {/* Search Input */}
            <div className="my-0 ms-28 flex max-w-xl items-center">
              <input
                type="text"
                className="h-10 w-[36rem] rounded-md bg-threads-dark px-4  py-2 text-threads-white focus:outline-none"
                placeholder="Search"
              />
            </div>

            {/* Nav Link and User area */}
            <div className="flex w-72 justify-between">
              <Link href={"/"}>
                <HomeIcon
                  width={30}
                  height={30}
                  color={pathname === "/" ? "#7F5AF0" : "#fff"}
                />
              </Link>
              <Link href={"/notifications"}>
                <NotificationIcon
                  width={30}
                  height={30}
                  color={pathname === "/notifications" ? "#7F5AF0" : "#fff"}
                />
              </Link>
              <Link href={"/new-threads"}>
                <AddIcon width={30} height={30} />
              </Link>
              <Link href={"/"}>
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
          {pathname !== "/new-threads" && (
            <div className="fixed bottom-0 left-0 right-0 z-10 flex w-full justify-between  border-t-[1px] border-t-white border-opacity-60 bg-threads-bg p-4 md:hidden">
              <Link href={"/"}>
                <HomeIcon
                  width={30}
                  height={30}
                  color={pathname === "/" ? "#7F5AF0" : "#fff"}
                />
              </Link>
              <Link href={"/search"}>
                <SearchIcon
                  width={30}
                  height={30}
                  color={pathname === "/search" ? "#7F5AF0" : "#fff"}
                />
              </Link>
              <Link href={"/new-threads"}>
                <AddIcon width={30} height={30} />
              </Link>
              <Link href={"/notifications"} className="relative">
                <NotificationIcon
                  width={30}
                  height={30}
                  color={pathname === "/notifications" ? "#7F5AF0" : "#fff"}
                />
                {notificationsCounter > 0 ? (
                  <div className="absolute top-0 h-4 w-4 rounded-full bg-red-500 text-center text-xs text-white">
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
