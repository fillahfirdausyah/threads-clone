import React from "react";

import Image from "next/image";
import { convertTimestamp } from "@utils/convertTimestamp";

const ReferNotificationsCard = ({ type, data }) => {
  return (
    <div className="mt-3 flex w-full items-start gap-3 rounded-md p-2 text-threads-white outline outline-0.5 outline-threads-gray">
      <Image
        src={
          data.creator.image !== undefined
            ? data.creator.image
            : "/Assets/img/user.png"
        }
        width={35}
        height={35}
        className="rounded-full object-contain"
      />
      <div className="flex w-full flex-col">
        <div className="flex justify-between">
          <h3 className="font-semibold">{data.creator.username}</h3>
          <span className="text-sm text-threads-gray">
            {convertTimestamp(data.timestamp)}
          </span>
        </div>
        <p className="text-start font-normal">{data.thread}</p>
        {data.image && (
          <Image
            src={`http://localhost:5000/images/${data.image}`}
            width={0}
            height={0}
            sizes="100%"
            className="mt-3 h-auto w-full rounded-xl"
          />
        )}
      </div>
    </div>
  );
};

export default ReferNotificationsCard;
