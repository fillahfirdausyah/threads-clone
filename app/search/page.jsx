import React from 'react';
import SearchCard from '@components/SearchCard';

const SearchPage = () => {
  return (
    <section className="mt-4 max-w-xl mx-auto px-3 mb-16 lg:mt-28 overflow-x-hidden">
      <div className="flex items-center">
        <h1 className="text-threads-white text-2xl font-semibold me-1">
          Search
        </h1>
        <p>🔍</p>
      </div>
      <div className="w-full mt-2">
        <input
          type="text"
          className="w-full h-9 px-2 bg-threads-dark text-threads-white rounded-md focus:outline-none"
          placeholder="Search"
        />
      </div>
      <div className="mt-5">
        <SearchCard />
        <SearchCard />
        <SearchCard />
        <SearchCard />
        <SearchCard />
        <SearchCard />
      </div>
    </section>
  );
};

export default SearchPage;
