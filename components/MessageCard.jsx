import React from "react";

import Image from "next/image";

const MessageCard = () => {
  const isiPesan = "Hallo, aku baru aja nyampe nih, harusnya bisa dong";
  return (
    <div className="mb-5 flex items-center justify-between">
      <div className="flex gap-5">
        <Image
          className="rounded-full object-contain"
          src={"https://avatarfiles.alphacoders.com/257/257029.jpg"}
          width={45}
          height={45}
        />
        <div className="flex flex-col">
          <h3>iron.man.real</h3>
          <span className="text-gray-400">
            {isiPesan.length > 20
              ? `${isiPesan.substring(0, 30)}....`
              : isiPesan}
          </span>
        </div>
      </div>
      <div>
        <span className="text-xs text-gray-400">3w</span>
      </div>
    </div>
  );
};

export default MessageCard;
