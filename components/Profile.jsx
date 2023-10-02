import { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Profile = ({ type, children, data, handleFollow, handleUnfollow }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [moreActionMenu, setMoreActionMenu] = useState(false);

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <section className="mx-auto mt-4 max-w-xl px-3 text-threads-white lg:mt-28">
      <div className="flex w-full items-start justify-between">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">
            {type === "My" ? session?.user.fullname : data.fullname}
          </h1>
          <p>
            @{type === "My" ? session?.user.username : data.username}
            <span className="rounded-full bg-threads-dark px-2 text-sm text-threads-gray">
              threadsclone.net
            </span>
          </p>
          {data.bio && <p className="mt-4">{data.bio}</p>}
        </div>
        <Image
          src={type === "My" ? session?.user.image : data.image}
          width={60}
          height={60}
          className="rounded-full object-contain"
        />
      </div>
      <div className="mt-5 flex items-center justify-between text-threads-gray">
        <div className="flex gap-1 text-sm">
          <Link href={`/profile/${data.username}/social`}>
            <p>{data.totalFollowers} Followers</p>
          </Link>
          <span className="text-threads-gray">•</span>
          {data.link !== "undefined" ? (
            <p className="cursor-pointer">
              <Link href={`http://${data.link}`} target="_blank">
                {data.link}
              </Link>
            </p>
          ) : (
            <></>
          )}
        </div>
        <div
          className="relative flex flex-col items-center justify-between"
          onClick={() => setMoreActionMenu((prev) => !prev)}
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-transparent outline outline-2">
            <Image
              src={"/Assets/icon/Outline/Interface/Other-1.svg"}
              width={25}
              height={25}
              className="cursor-pointer"
            />
          </div>
          {moreActionMenu ? (
            <div className="absolute right-0 top-7 w-44 rounded-md bg-threads-dark p-3 text-threads-white">
              {type === "My" ? (
                <button
                  type="button"
                  className="h-full w-full text-start text-red-500 hover:text-red-400"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              ) : (
                <button
                  type="button"
                  className="h-full w-full text-start text-threads-white hover:text-threads-purple-400"
                  onClick={() =>
                    navigator.clipboard.writeText(window.location.href)
                  }
                >
                  Copy Link Profile
                </button>
              )}
            </div>
          ) : (
            <> </>
          )}
        </div>
      </div>
      <div className="mt-5 flex w-full gap-6 text-center">
        {session?.user.username === data.username && (
          <>
            <Link
              href={`/profile/${session?.user.username}/setting`}
              className="w-1/2 rounded-md bg-transparent px-7 py-[0.4rem] text-sm outline outline-1 hover:bg-threads-purple-500 hover:outline-threads-purple-500"
            >
              Edit Profile
            </Link>
            <button className="w-1/2 rounded-md bg-transparent px-7 py-[0.4rem] text-sm outline outline-1 hover:bg-threads-purple-500 hover:outline-threads-purple-500">
              Share Profile
            </button>
          </>
        )}
        {session?.user.username !== data.username && (
          <>
            {data.isFollowed ? (
              <>
                <button
                  onClick={() =>
                    handleUnfollow && handleUnfollow(data.username)
                  }
                  className="w-full rounded-md bg-transparent px-7 py-1 outline outline-1 hover:outline-threads-purple-400"
                >
                  Following
                </button>
                <button
                  onClick={() => router.push(`/message/${data.username}`)}
                  className="w-full rounded-md bg-transparent px-7 py-1 outline outline-1 hover:outline-threads-purple-400"
                >
                  Message
                </button>
              </>
            ) : (
              <button
                onClick={() => handleFollow && handleFollow(data.username)}
                className="w-full rounded-md bg-threads-purple-500 px-7 py-1 hover:bg-threads-purple-400"
              >
                {data.isFollowedMe ? "Follow Back" : "Follow"}
              </button>
            )}
          </>
        )}
      </div>
      <div className="mt-5 flex items-center justify-between gap-1 text-center text-threads-gray">
        <div className="tab-active flex-1 cursor-pointer py-3">
          <h1>Threads</h1>
        </div>
        <div className="flex-1 cursor-pointer border-b-[0.5px] border-b-threads-gray py-3">
          <h1>Replies</h1>
        </div>
      </div>
      <section className="mb-16">{children}</section>
    </section>
  );
};

export default Profile;
