'use client';

import { useState, useEffect, useRef } from 'react';
import { convertTimestamp } from '@utils/convertTimestamp';
import { useSession } from 'next-auth/react';

import Image from 'next/image';

const PostCard = ({ post, handleDeleteThread }) => {
  const { data: session } = useSession();
  const ref = useRef(null);
  const [heightPostCard, setHeightPostCard] = useState(0);
  const [moreActionMenu, setMoreActionMenu] = useState(false);

  useEffect(() => {
    setHeightPostCard(ref.current.clientHeight);
  }, []);

  return (
    <div className="post-separator mb-3 py-3 px-3">
      {post.rethread && (
        <div className="flex items-center text-sm px-7 gap-1 text-threads-gray">
          <Image
            className="cursor-pointer"
            src={'/Assets/icon/Outline/Communication/Forward.svg'}
            width={22}
            height={22}
          />
          <p>ryujin.itzy rethread</p>
        </div>
      )}
      <div className="flex items-start mt-2">
        <div className="flex flex-col items-center justify-end me-4">
          <div className="flex-1">
            <Image
              src={`${post.creator.image}`}
              width={45}
              height={45}
              className="rounded-full cursor-pointer"
            />
          </div>
          {post.repliesCount > 0 && (
            <>
              <div
                className={`left-1/2 -ml-0.5 w-0.5 bg-gray-600 my-3`}
                style={
                  post.posts.image
                    ? {
                        height: `${heightPostCard - 97}px`,
                      }
                    : { height: `${heightPostCard - 95}px` }
                }
              ></div>
              <div className="flex-1">
                <Image
                  src={'/Assets/img/user.png'}
                  width={25}
                  height={25}
                  className="rounded-full cursor-pointer"
                />
              </div>
            </>
          )}
        </div>
        <div ref={ref} className="flex flex-col flex-1 relative">
          <div className="flex items-center justify-between">
            <h3 className="font-lato font-bold cursor-pointer">
              {post.creator.username}
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-threads-gray">
                {convertTimestamp(post.timestamp)}
              </span>
              <Image
                src={'/Assets/icon/Outline/Interface/Other-1.svg'}
                width={20}
                height={20}
                className="cursor-pointer"
                onClick={() => setMoreActionMenu((prev) => !prev)}
              />
              {moreActionMenu && (
                <div className="absolute right-0 top-5 w-52 p-3 flex flex-col gap-3 bg-threads-dark rounded-md">
                  <p>Copy Link</p>
                  {session?.user.id === post.creator._id && (
                    <button
                      onClick={handleDeleteThread(post._id)}
                      className="post-separator p-2 w-full cursor-pointer text-red-500 hover:text-red-300"
                    >
                      Delete
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="text-left mt-1 cursor-pointer">
            <p className="font-lato font-normal">{post.thread}</p>
          </div>
          {post.image && (
            <Image
              src={`http://localhost:5000/images/${post.image}`}
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto rounded-xl mt-3"
            />
          )}
          <div className="flex justify-between w-[160px] mt-3">
            <Image
              className="cursor-pointer"
              src={'/Assets/icon/Outline/Status/Heart.svg'}
              width={30}
              height={30}
            />
            <Image
              className="cursor-pointer"
              src={'/Assets/icon/Outline/Communication/Comment.svg'}
              width={30}
              height={30}
            />
            <Image
              className="cursor-pointer"
              src={'/Assets/icon/Outline/Communication/Forward.svg'}
              width={30}
              height={30}
            />
            <Image
              className="cursor-pointer"
              src={'/Assets/icon/Outline/Communication/Send.svg'}
              width={30}
              height={30}
            />
          </div>
          <div className="flex items-center gap-1 mt-2">
            {post.repliesCount > 0 && (
              <>
                <span className="text-xs font-semibold text-threads-gray">
                  {post.posts.repliesCount > 1
                    ? `${post.posts.repliesCount} Replies`
                    : `${post.posts.repliesCount} Reply`}{' '}
                </span>
                <span className="text-threads-gray">•</span>
              </>
            )}

            {post.likesCount > 0 && (
              <span className="text-xs font-semibold text-threads-gray">
                {post.posts.likesCount > 1
                  ? `${post.posts.likesCount} Likes`
                  : `${post.posts.likesCount} Like`}{' '}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
