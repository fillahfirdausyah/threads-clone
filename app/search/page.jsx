'use client';

import { useState, useEffect } from 'react';
import SearchCard from '@components/SearchCard';
import { debounce } from '@utils/debounce';

const SearchList = ({ data }) => {
  return (
    <>
      {data.map((user) => (
        <SearchCard key={user.id} user={user} />
      ))}
    </>
  );
};

const SearchPage = () => {
  const [search, setSearch] = useState('');
  const [debounceTimeoutId, setDebounceTimeoutId] = useState(null);
  const [result, setResult] = useState([]);
  const [recentSearch, setRecentSearch] = useState([]);

  const performSearch = async () => {
    const response = await fetch(
      `http://localhost:5000/v1/users?username=${search}`
    );
    const data = await response.json();
    setResult(data.data);
  };

  const getRecentSearch = async () => {
    const recentSearch = JSON.parse(localStorage.getItem('recent-search'));
    setRecentSearch(recentSearch);
  };

  useEffect(() => {
    if (debounceTimeoutId) clearTimeout(debounceTimeoutId);

    const newDounceTimeoutId = debounce(() => {
      if (search === '') return setResult([]);
      performSearch();
    }, 500);

    setDebounceTimeoutId(newDounceTimeoutId);
  }, [search]);

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
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          name="search"
          type="text"
          className="w-full h-9 px-2 bg-threads-dark text-threads-white rounded-md focus:outline-none"
          placeholder="Search"
        />
      </div>
      {search === '' ? (
        <>
          <div>
            <h1 className="text-threads-white text-lg font-semibold mt-5">
              Recent Searches
            </h1>
            <div className="mt-5">
              <SearchList data={recentSearch} />
            </div>
          </div>
        </>
      ) : (
        <div className="mt-5">
          <SearchList data={result} />
        </div>
      )}
    </section>
  );
};

export default SearchPage;
