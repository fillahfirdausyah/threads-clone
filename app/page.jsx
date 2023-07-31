import Feed from '@components/Feed';
import Navbar from '@components/Navbar';

const HomePage = () => {
  return (
    <main className="text-threads-white">
      <Navbar />
      <div className="px-2 relative">
        <div className="flex max-w-xl mx-auto ">
          <Feed />
        </div>
      </div>
    </main>
  );
};

export default HomePage;
