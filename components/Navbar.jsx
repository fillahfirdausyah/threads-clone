import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="w-full">
      <div className="w-full flex items-center justify-center p-2 border-b-[1px] border-opacity-60 border-b-white">
        <Image
          src={'/Assets/img/threads-logo-png.webp'}
          width={30}
          height={30}
        />
      </div>

      <div className="fixed z-10 bottom-0 right-0 left-0 w-full p-4 sm:hidden flex border-t-[1px] border-opacity-60 justify-between border-t-white bg-threads-bg">
        <Link href={'/'}>
          <Image
            src={'/Assets/icon/Outline/General/Home.svg'}
            width={35}
            height={35}
          />
        </Link>
        <Link href={'/'}>
          <Image
            src={'/Assets/icon/Outline/Status/Notification.svg'}
            width={35}
            height={35}
          />
        </Link>
        <Link href={'/new-threads'}>
          <Image
            src={'/Assets/icon/Outline/Interface/Add.svg'}
            width={35}
            height={35}
          />
        </Link>
        <Link href={'/'}>
          <Image
            src={'/Assets/icon/Outline/Status/Fire.svg'}
            width={35}
            height={35}
          />
        </Link>
        <Link href={'/'}>
          <Image
            src={'/Assets/img/user.png'}
            width={35}
            height={35}
            className="rounded-full object-contain"
          />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
