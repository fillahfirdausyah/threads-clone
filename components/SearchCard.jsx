import Image from 'next/image';

const SearchCard = () => {
  return (
    <div className="flex items-start gap-2 text-threads-white post-separator py-2">
      <Image
        src={'/Assets/img/user.png'}
        width={40}
        height={40}
        className="rounded-full object-contain"
      />
      <div className="flex flex-1 justify-between  items-center">
        <div className="flex flex-col">
          <h1 className="font-semibold">pixelpilot4</h1>
          <h4 className="text-sm text-threads-gray">Barry Allen</h4>
        </div>
        <button className="bg-threads-purple-500 px-3 py-1 rounded-md text-threads-white text-sm font-medium hover:bg-threads-purple-400">
          Follow
        </button>
      </div>
    </div>
  );
};

export default SearchCard;
