import Feed from '@components/Feed';

const HomePage = () => {
  return (
    <main className="text-threads-white">
      <div className="flex max-w-xl mx-auto ">
        <Feed />
      </div>
    </main>
  );
};

export default HomePage;
