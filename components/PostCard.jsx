"use client";

import { useState, useEffect, useRef } from "react";
import { convertTimestamp } from "@utils/convertTimestamp";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Image from "next/image";
import Link from "next/link";

const PostCard = ({
  post,
  handleDeleteThread,
  handleLikeThread,
  handleUnlikeThread,
}) => {
  const { data: session } = useSession();
  const router = useRouter();
  const ref = useRef(null);
  const [heightPostCard, setHeightPostCard] = useState(0);
  const [moreActionMenu, setMoreActionMenu] = useState(false);

  useEffect(() => {
    setHeightPostCard(ref.current.clientHeight);
  }, []);

  const handleGoToPost = () => {
    router.push(`/post/${post._id}/${post.creator.username}}`);
  };

  return (
    <div className="mb-3 px-3 py-3 text-threads-white">
      {post.rethread && (
        <div className="flex items-center gap-1 px-7 text-sm text-threads-gray">
          <Image
            className="cursor-pointer"
            src={"/Assets/icon/Outline/Communication/Forward.svg"}
            width={22}
            height={22}
          />
          <p>ryujin.itzy rethread</p>
        </div>
      )}
      <div className="mt-2 flex items-start ">
        <div className="me-4 flex flex-col items-center justify-end">
          <div className="flex-1">
            <Link href={`/profile/${post.creator.username}`}>
              <Image
                src={post.creator.image}
                width={45}
                height={45}
                className="cursor-pointer rounded-full"
              />
            </Link>
          </div>
          {post.totalComments > 0 && (
            <>
              <div
                className={`left-1/2 my-3 -ml-0.5 w-0.5 bg-gray-600`}
                style={
                  post.image
                    ? {
                        height: `${heightPostCard - 97}px`,
                      }
                    : { height: `${heightPostCard - 95}px` }
                }
              ></div>
              <div className="flex-1">
                {post.comments.length > 0 && (
                  <Image
                    src={post.comments[0].commenter_id.image}
                    width={25}
                    height={25}
                    className="cursor-pointer rounded-full"
                  />
                )}
              </div>
            </>
          )}
        </div>
        <div ref={ref} className="relative flex flex-1 flex-col ">
          <div className="flex items-center justify-between">
            <h3 className="cursor-pointer font-lato font-bold">
              {post.creator.username}
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-threads-gray">
                {convertTimestamp(post.timestamp)}
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
                  {session?.user.id === post.creator._id && (
                    <button
                      onClick={() => {
                        setMoreActionMenu(false);
                        handleDeleteThread(post._id);
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
            <p className="font-lato font-normal">{post.thread}</p>
          </div>
          {post.image && (
            <Image
              src={`http://localhost:5000/images/${post.image}`}
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
                post.isLiked
                  ? handleUnlikeThread(post._id)
                  : handleLikeThread(post._id)
              }
              src={
                post.isLiked
                  ? "/Assets/icon/Solid/Status/Heart.svg"
                  : "/Assets/icon/Outline/Status/Heart.svg"
              }
              width={30}
              height={30}
            />
            <Image
              className="cursor-pointer"
              onClick={handleGoToPost}
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
            {post.totalComments > 0 && (
              <>
                {post.totalComments > 1 ? (
                  <span
                    onClick={handleGoToPost}
                    className="cursor-pointer text-xs font-semibold text-threads-gray"
                  >
                    {post.totalComments} Replies
                  </span>
                ) : (
                  <span
                    onClick={handleGoToPost}
                    className="cursor-pointer text-xs font-semibold text-threads-gray"
                  >
                    {post.totalComments} Reply
                  </span>
                )}
                <span className="text-threads-gray">•</span>
              </>
            )}

            {post.totalLikes > 0 && (
              <span className="text-xs font-semibold text-threads-gray">
                {post.totalLikes > 1
                  ? `${post.totalLikes} Likes`
                  : `${post.totalLikes} Like`}{" "}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
