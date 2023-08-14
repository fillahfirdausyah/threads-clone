import Image from 'next/image';
import Link from 'next/link';

const HeaderNav = ({ title, type }) => {
  return (
    <nav className="bg-threads-bg z-10 max-w-xl mx-auto fixed top-0 right-0 left-0">
      <div className="w-full flex items-center justify-start gap-4 p-3 header-separator">
        <Link href={'/'} replace>
          <Image
            src={
              type === 'back'
                ? '/Assets/icon/Outline/Interface/Arrow left.svg'
                : '/Assets/icon/Outline/Interface/Cross.svg'
            }
            width={30}
            height={30}
          />
        </Link>
        <h2 className="text-threads-white text-base font-semibold">{title}</h2>
      </div>
    </nav>
  );
};

export default HeaderNav;
