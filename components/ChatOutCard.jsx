import React from "react";

import Image from "next/image";

const ChatOutCard = ({ message, user }) => {
  return (
    <div class="chat-message">
      <div class="flex items-end justify-end">
        <div class="order-1 mx-2 flex max-w-xs flex-col items-end space-y-2 text-xs">
          <div>
            <span class="inline-block rounded-lg rounded-br-none bg-blue-600 px-4 py-2 text-white ">
              {message}
            </span>
          </div>
        </div>
        <Image
          src={user.user.image}
          width={30}
          height={30}
          class="order-2 h-6 w-6 rounded-full"
        />
      </div>
    </div>
  );
};

export default ChatOutCard;
