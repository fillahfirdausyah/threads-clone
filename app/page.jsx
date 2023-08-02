import Feed from '@components/Feed';

import Header from '@components/Header';

const HomePage = () => {
  return (
    <main className="text-threads-white">
      <Header />
      <div className="flex max-w-xl mx-auto relative">
        <Feed />
      </div>
    </main>
  );
};

export default HomePage;
