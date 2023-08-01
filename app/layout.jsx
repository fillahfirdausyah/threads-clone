'use client';
import '@styles/global.css';
import { usePathname } from 'next/navigation';
import Navbar from '@components/Navbar';

export const metadata = {
  title: 'Threads Clone',
  description: 'Let’s share what is in your mind with text based Social Media',
};

const RootLayout = ({ children }) => {
  const pathname = usePathname();
  return (
    <html lang="en" className="bg-threads-bg">
      <body className="font-lato">
        {pathname === '/new-threads' ? null : <Navbar />}
        <div className="px-2 relative">{children}</div>
      </body>
    </html>
  );
};

export default RootLayout;
