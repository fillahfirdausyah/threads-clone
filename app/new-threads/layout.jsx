import Image from 'next/image';
import Link from 'next/link';

const RootLayoutNewThreads = ({ children }) => {
  return (
    <>
      <nav className="max-w-xl mx-auto">
        <div className="w-full flex items-center justify-start gap-4 p-2 border-b-[1px] border-opacity-60 border-b-white">
          <Link href={'/'} replace>
            <Image
              src={'/Assets/icon/Outline/Interface/Cross.svg'}
              width={30}
              height={30}
            />
          </Link>
          <h2 className="text-threads-white text-lg font-semibold">
            New Thread
          </h2>
        </div>
      </nav>
      {children}
    </>
  );
};

export default RootLayoutNewThreads;
