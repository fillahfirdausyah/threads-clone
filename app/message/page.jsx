"use client";
import React from "react";

import Image from "next/image";
import HeaderNav from "@components/HeaderNav";
import MessageCard from "@components/MessageCard";

const MessagePage = () => {
  return (
    <>
      <HeaderNav title={"Message"} />
      {/* Search bar */}
      <section className="mx-auto mb-20 mt-16 max-w-xl px-6 text-threads-white">
        <div className="mt-2 flex w-full gap-2">
          <input
            name="search"
            type="text"
            className="h-9 w-full rounded-md bg-threads-dark px-2 text-threads-white focus:outline-none"
            placeholder="Search"
          />
          <Image
            src="/Assets/icon/Outline/Interface/Edit.svg"
            width={30}
            height={30}
          />
        </div>
        <div className="mt-5">
          <p className="text-center text-gray-500">There's no message</p>
        </div>
      </section>
    </>
  );
};

export default MessagePage;
