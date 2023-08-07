import Image from 'next/image';
import { useRouter } from 'next/navigation';

const SearchCard = ({ user }) => {
  const router = useRouter();
  const toProfile = () => {
    const recentSearch = JSON.parse(localStorage.getItem('recent-search'));
    if (recentSearch === null) {
      localStorage.setItem('recent-search', JSON.stringify(user));
    } else {
      const newRecentSearch = recentSearch._id ? [recentSearch] : recentSearch;
      if (
        newRecentSearch.find((x) => x.username === user.username) === undefined
      ) {
        newRecentSearch.push(user);
        localStorage.setItem('recent-search', JSON.stringify(newRecentSearch));
      }
    }
    router.push(`/profile/${user.username}`);
  };

  return (
    <div className="flex items-start gap-2 text-threads-white post-separator py-2">
      <Image
        onClick={toProfile}
        src={user.image}
        width={40}
        height={40}
        className="rounded-full object-contain cursor-pointer"
      />
      <div className="flex flex-1 justify-between  items-center">
        <div className="flex flex-col">
          <h1 onClick={toProfile} className="font-semibold cursor-pointer">
            {user.username}
          </h1>
          <h4
            onClick={toProfile}
            className="text-sm text-threads-gray cursor-pointer"
          >
            {user.fullname}
          </h4>
        </div>
        <button className="bg-threads-purple-500 px-3 py-1 rounded-md text-threads-white text-sm font-medium hover:bg-threads-purple-400">
          Follow
        </button>
      </div>
    </div>
  );
};

export default SearchCard;
