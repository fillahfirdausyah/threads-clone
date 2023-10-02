import React from "react";

import { ThreadsLogo } from "./icons/ThreadsLogo";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <>
      {/* Mobile Header */}
      <div className="header-separator flex w-full items-center justify-between px-2 py-6 md:hidden">
        <div className="flex items-center justify-center gap-1 text-white">
          <ThreadsLogo width={30} height={30} />
          <h2>Trheads Clone.</h2>
        </div>
        <Link href={"/message"}>
          <Image
            src={"/Assets/icon/Outline/Communication/Envelope.svg"}
            width={30}
            height={30}
          />
        </Link>
      </div>
      {/* Mobile Header */}
    </>
  );
};

export default Header;
