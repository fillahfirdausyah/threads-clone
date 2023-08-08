import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const SocialCard = ({ user, isFollowing, handleFollow, handleUnfollow }) => {
  const { data: session } = useSession();
  return (
    <div className="flex items-start gap-2 text-threads-white py-2">
      <Link href={`/profile/${user.username}`}>
        <Image
          src={user.image}
          width={40}
          height={40}
          className="rounded-full object-contain cursor-pointer"
        />
      </Link>
      <div className="flex flex-1 justify-between  items-center">
        <div className="flex flex-col">
          <Link href={`/profile/${user.username}`}>
            <h1 className="font-semibold cursor-pointer">{user.username}</h1>
          </Link>
          <Link href={`/profile/${user.username}`}>
            <h4 className="text-sm text-threads-gray cursor-pointer">
              {user.fullname}
            </h4>
          </Link>
        </div>
        {isFollowing && (
          <button
            onClick={() => handleFollow && handleUnfollow(user.username)}
            className="bg-transparent outline outline-1  px-3 py-1 rounded-md text-threads-white text-sm font-medium hover:outline-threads-purple-500"
          >
            Unfollow
          </button>
        )}
        {isFollowing === false && user.username !== session?.user.username && (
          <button
            onClick={() => handleFollow(user.username)}
            className="bg-threads-purple-500 px-3 py-1 rounded-md text-threads-white text-sm font-medium hover:bg-threads-purple-400"
          >
            Follow
          </button>
        )}
      </div>
    </div>
  );
};

export default SocialCard;
