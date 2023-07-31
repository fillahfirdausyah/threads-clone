import '@styles/global.css';

import Navbar from '@components/Navbar';

export const metadata = {
  title: 'Threads Clone',
  description: 'Let’s share what is in your mind with text based Social Media',
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en" className="bg-threads-bg">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
