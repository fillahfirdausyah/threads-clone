import React from "react";

import Image from "next/image";
import ReferNotificationsCard from "./ReferNotificationsCard";
import { convertTimestamp } from "@utils/convertTimestamp";

const NotificationsCard = ({ data }) => {
  return (
    <div className="post-separator my-4 flex w-full items-start justify-between gap-4 py-4">
      <Image
        src={
          data.notification.type === "follow"
            ? data.notification.data.image
            : data.notification.actionUser.image
        }
        width={40}
        height={40}
        className="rounded-full object-contain"
      />
      {data.likesCount > 2 && (
        <Image
          src={"/Assets/img/user.png"}
          width={40}
          height={40}
          className="ms-[-45px] mt-2 rounded-full object-contain"
        />
      )}
      <div className="flex flex-1 items-center justify-between">
        <div
          className={
            data.notification.type === "like" ||
            data.notification.type === "comments"
              ? "flex w-full flex-col items-start"
              : "flex flex-col items-start"
          }
        >
          <h1 className="font-semibold text-threads-white">
            {data.notification.type === "follow"
              ? data.notification.data.username
              : data.notification.actionUser.username}
          </h1>
          {data.notification.type === "follow" && (
            <p className="text-threads-white text-opacity-60">
              Followed you {convertTimestamp(data.notification.action_at)} ago
            </p>
          )}
          {data.notification.type === "like" && (
            <>
              <p className="text-threads-white text-opacity-60">
                Like your thread {convertTimestamp(data.notification.action_at)}{" "}
                ago
              </p>
              <ReferNotificationsCard data={data.notification.data} />
            </>
          )}
          {data.notification.type === "comments" && (
            <>
              <p className="text-threads-white text-opacity-60">
                Comment your thread 2h ago
              </p>
              <ReferNotificationsCard />
            </>
          )}
        </div>
        {data.notification.type === "follow" && (
          <button className="rounded-md bg-threads-purple-500 px-3 py-1 text-sm font-medium text-threads-white hover:bg-threads-purple-400">
            Follow Back
          </button>
        )}
      </div>
    </div>
  );
};

export default NotificationsCard;
