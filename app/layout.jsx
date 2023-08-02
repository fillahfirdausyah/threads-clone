import '@styles/global.css';
import Navbar from '@components/Navbar';

import CoverPage from './cover/page';

export const metadata = {
  title: 'Threads Clone',
  description: 'Let’s share what is in your mind with text based Social Media',
};

const session = true;

const RootLayout = ({ children }) => {
  return (
    <html lang="en" className="bg-threads-bg">
      <body className="font-lato">
        {session ? (
          <>
            <Navbar />
            <div className="px-2 relative">{children}</div>
          </>
        ) : (
          <CoverPage />
        )}
      </body>
    </html>
  );
};

export default RootLayout;
