import Image from 'next/image';
import Link from 'next/link';

import { SendIcon } from '@components/icons/SendIcon';
const RootLayoutNewThreads = ({ children }) => {
  return (
    <>
      <nav className="max-w-xl mx-auto">
        <div className="w-full flex items-center justify-start gap-4 p-2 border-b-[1px] border-opacity-60 border-b-white">
          <Link href={'/'}>
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
      <nav className="max-w-xl mx-auto fixed z-10 bottom-0 right-0 left-0 p-4 flex border-t-[1px] border-opacity-60 justify-between border-t-white bg-threads-bg">
        <p className="text-threads-white">Post Thread</p>
        <SendIcon width={30} height={30} />
      </nav>
    </>
  );
};

export default RootLayoutNewThreads;
