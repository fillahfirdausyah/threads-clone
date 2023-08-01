import PostCard from './PostCard';

const Feed = () => {
  return (
    <div className="w-full mb-16 lg:mt-28">
      <PostCard
        post={{
          username: 'PixelPilot4',
          time: '2h',
          posts: {
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
            repliesCount: 10,
          },
        }}
      />
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
    </div>
  );
};

export default Feed;
