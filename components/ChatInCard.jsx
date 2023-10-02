import React from "react";

import Image from "next/image";

const ChatInCard = ({ message }) => {
  return (
    <div class="chat-message">
      <div class="flex items-end">
        <div class="order-2 mx-2 flex max-w-xs flex-col items-start space-y-2 text-xs">
          <div>
            <span class="inline-block rounded-lg rounded-bl-none bg-gray-300 px-4 py-2 text-gray-600">
              {message}
            </span>
          </div>
        </div>
        <Image
          src={"https://avatarfiles.alphacoders.com/257/257029.jpg"}
          width={30}
          height={30}
          class="order-1 h-6 w-6 rounded-full"
        />
      </div>
    </div>
  );
};

export default ChatInCard;
