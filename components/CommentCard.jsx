"use client";

import Image from "next/image";
import Link from "next/link";

import { useState } from "react";
import { convertTimestamp } from "@utils/convertTimestamp";
import { useSession } from "next-auth/react";

const CommentCard = ({ reply }) => {
  const { data: session } = useSession();
  const [moreActionMenu, setMoreActionMenu] = useState(false);

  const handleGoToPost = () => {
    router.push(`/post/${reply._id}/${reply.creator.username}}`);
  };

  return (
    <div className="mb-3 px-3 py-3 text-threads-white">
      <div className="mt-2 flex items-start ">
        <div className="me-4 flex flex-col items-center justify-end">
          <div className="flex-1">
            <Link href={`/profile/${reply.commenter_id.username}`}>
              <Image
                src={reply.commenter_id.image}
                width={45}
                height={45}
                className="cursor-pointer rounded-full"
              />
            </Link>
          </div>
          {reply.totalComments > 0 && (
            <>
              <div
                className={`left-1/2 my-3 -ml-0.5 w-0.5 bg-gray-600`}
                style={
                  reply.image
                    ? {
                        height: `${heightPostCard - 97}px`,
                      }
                    : { height: `${heightPostCard - 95}px` }
                }
              ></div>
              <div className="flex-1">
                <Image
                  src={"/Assets/img/user.png"}
                  width={25}
                  height={25}
                  className="cursor-pointer rounded-full"
                />
              </div>
            </>
          )}
        </div>
        <div className="relative flex flex-1 flex-col ">
          <div className="flex items-center justify-between">
            <h3 className="cursor-pointer font-lato font-bold">
              {reply.commenter_id.username}
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-threads-gray">
                {convertTimestamp(reply.action_at)}
              </span>
              <Image
                src={"/Assets/icon/Outline/Interface/Other-1.svg"}
                width={20}
                height={20}
                className="cursor-pointer"
                onClick={() => setMoreActionMenu((prev) => !prev)}
              />
              {moreActionMenu && (
                <div className="absolute right-0 top-5 flex w-52 flex-col items-start gap-3 rounded-md bg-threads-dark p-3">
                  <button>Copy Link Thread</button>
                  {session?.user.id === reply.commenter_id._id && (
                    <button
                      onClick={() => {
                        setMoreActionMenu(false);
                        handleDeleteThread(reply._id);
                      }}
                      className="post-separator w-full cursor-pointer p-2 text-start text-red-500 hover:text-red-300"
                    >
                      Delete
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
          <div
            className="mt-1 cursor-pointer text-left"
            onClick={() => handleGoToPost()}
          >
            <p className="font-lato font-normal">{reply.comment}</p>
          </div>
          {reply.image && (
            <Image
              src={`http://localhost:5000/images/${reply.image}`}
              width={0}
              height={0}
              sizes="100vw"
              className="mt-3 h-auto w-full rounded-xl"
            />
          )}
          <div className="mt-3 flex w-[160px] justify-between">
            <Image
              className="cursor-pointer"
              onClick={() =>
                reply.isLiked
                  ? handleUnlikeThread(reply._id)
                  : handleLikeThread(reply._id)
              }
              src={
                reply.isLiked
                  ? "/Assets/icon/Solid/Status/Heart.svg"
                  : "/Assets/icon/Outline/Status/Heart.svg"
              }
              width={30}
              height={30}
            />
            <Image
              className="cursor-pointer"
              src={"/Assets/icon/Outline/Communication/Comment.svg"}
              width={30}
              height={30}
            />
            <Image
              className="cursor-pointer"
              src={"/Assets/icon/Outline/Communication/Forward.svg"}
              width={30}
              height={30}
            />
            <Image
              className="cursor-pointer"
              src={"/Assets/icon/Outline/Communication/Send.svg"}
              width={30}
              height={30}
            />
          </div>
          <div className="mt-2 flex items-center gap-1">
            {reply.totalComments > 0 && (
              <>
                <span className="text-xs font-semibold text-threads-gray">
                  {reply.totalComments > 1
                    ? `${reply.totalComments} Replies`
                    : `${reply.totalComments} Reply`}{" "}
                </span>
                <span className="text-threads-gray">•</span>
              </>
            )}

            {reply.totalLikes > 0 && (
              <span className="text-xs font-semibold text-threads-gray">
                {reply.totalLikes > 1
                  ? `${reply.totalLikes} Likes`
                  : `${reply.totalLikes} Like`}{" "}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
