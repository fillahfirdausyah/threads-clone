import '@styles/global.css';
import Navbar from '@components/Navbar';

import Provider from '@components/Provider';

export const metadata = {
  title: 'Threads Clone',
  description: 'Let’s share what is in your mind with text based Social Media',
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en" className="bg-threads-bg">
      <body className="font-lato">
        <Provider>
          <Navbar />
          <div className="px-2 relative">{children}</div>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
