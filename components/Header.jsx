import React from 'react';

import { ThreadsLogo } from './icons/ThreadsLogo';

const Header = () => {
  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden header-separator w-full flex items-center justify-center py-6">
        <ThreadsLogo width={30} height={30} />
      </div>
      {/* Mobile Header */}
    </>
  );
};

export default Header;
