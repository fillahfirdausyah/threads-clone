import Image from 'next/image';

import PostCard from '@components/PostCard';

export const metaData = {
  title: 'Profile',
  description: 'Profile page',
};

const ProfilePage = () => {
  return (
    <section className="mt-4 max-w-xl mx-auto px-3 lg:mt-28 text-threads-white">
      <div className="flex w-full justify-between items-start">
        <div className="flex flex-col">
          <h1 className="font-bold text-2xl">Barry Allen</h1>
          <p>
            pixelpilot4{' '}
            <span className="bg-threads-dark px-2 rounded-full text-sm text-threads-gray">
              threadsclone.net
            </span>
          </p>
          <p className="mt-4">Fastest Man Alive</p>
        </div>
        <Image
          src={'/Assets/img/user.png'}
          width={60}
          height={60}
          className="rounded-full object-contain"
        />
      </div>
      <div className="flex items-center justify-between mt-5 text-threads-gray">
        <div className="flex gap-1 text-sm">
          <p>123 Followers</p>
          <span className="text-threads-gray">•</span>
          <p className="cursor-pointer">barryallen.net</p>
        </div>
        <div className="bg-transparent outline outline-2 rounded-full">
          <Image
            src={'/Assets/icon/Outline/Interface/Other-1.svg'}
            width={25}
            height={25}
            className="cursor-pointer"
          />
        </div>
      </div>
      <div className="mt-5 flex items-center text-center justify-between  text-threads-gray gap-1">
        <div className="flex-1 py-3 tab-active cursor-pointer">
          <h1>Threads</h1>
        </div>
        <div className="flex-1 py-3 cursor-pointer border-b-[0.5px] border-b-threads-gray">
          <h1>Replies</h1>
        </div>
      </div>
      <section>
        <PostCard
          post={{
            username: 'PixelPilot4',
            time: '2h',
            posts: {
              text: 'Lorem ipsum dolor sit ame',
              image: '/Assets/img/post1.png',
              repliesCount: 10,
              likesCount: 80,
            },
            rethread: true,
          }}
        />
        <PostCard
          post={{
            username: 'PixelPilot4',
            time: '2h',
            posts: {
              text: 'Lorem ipsum dolor sit ame',
            },
          }}
        />
        <PostCard
          post={{
            username: 'PixelPilot4',
            time: '2h',
            posts: {
              text: 'Lorem ipsum dolor sit ame',
              image: '/Assets/img/post2.png',
              repliesCount: 1,
              likesCount: 80,
            },
          }}
        />
        <PostCard
          post={{
            username: 'PixelPilot4',
            time: '2h',
            posts: {
              text: 'Lorem ipsum dolor sit ame',
            },
          }}
        />
        <PostCard
          post={{
            username: 'PixelPilot4',
            time: '2h',
            posts: {
              text: 'Lorem ipsum dolor sit ame',
            },
          }}
        />
        <PostCard
          post={{
            username: 'PixelPilot4',
            time: '2h',
            posts: {
              text: 'Lorem ipsum dolor sit ame',
            },
          }}
        />
        <PostCard
          post={{
            username: 'PixelPilot4',
            time: '2h',
            posts: {
              text: 'Lorem ipsum dolor sit ame',
            },
          }}
        />
      </section>
    </section>
  );
};

export default ProfilePage;
