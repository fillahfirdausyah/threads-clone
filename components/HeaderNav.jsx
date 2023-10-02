"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const HeaderNav = ({ title, type }) => {
  const router = useRouter();
  return (
    <nav className="fixed left-0 right-0 top-0 z-10 mx-auto max-w-xl bg-threads-bg">
      <div className="header-separator flex w-full items-center justify-start gap-4 p-3">
        <Image
          onClick={() => router.back()}
          src={
            type === "back"
              ? "/Assets/icon/Outline/Interface/Arrow left.svg"
              : "/Assets/icon/Outline/Interface/Cross.svg"
          }
          width={30}
          height={30}
        />

        <h2 className="text-base font-semibold text-threads-white">{title}</h2>
      </div>
    </nav>
  );
};

export default HeaderNav;
