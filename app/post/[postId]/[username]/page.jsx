"use client";

import HeaderNav from "@components/HeaderNav";
import Image from "next/image";
import SinglePostCard from "@components/SinglePostCard";
import CommentCard from "@components/CommentCard";

import { SendIcon } from "@components/icons/SendIcon";
import { useSession } from "next-auth/react";
import { useState, useEffect, useRef } from "react";

const UserPostPage = ({ params }) => {
  const { data: session } = useSession();
  const [thread, setThread] = useState({});
  const [threadReplies, setThreadReplies] = useState([]);
  const [fetchingData, setFetchingData] = useState(false);
  const [comment, setComment] = useState("");

  const commentRef = useRef(null);

  useEffect(() => {
    // Fetch post data
    const getSingleThread = async () => {
      const response = await fetch(
        `http://localhost:5000/v1/threads/${params.postId}?sessionUserId=${session?.user.id}`,
      );
      const data = await response.json();
      setThread(data.data);
    };

    const getThreadReplies = async () => {
      const response = await fetch(
        `http://localhost:5000/v1/threads/${params.postId}/comments`,
      );
      const data = await response.json();
      setThreadReplies(data.data);
    };

    session?.user && getSingleThread();
    session?.user && getThreadReplies();

    // Scroll to comment
    if (commentRef.current) {
      commentRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [fetchingData]);

  const handleComment = async () => {
    const response = await fetch(
      `http://localhost:5000/v1/threads/${params.postId}/comments`,
      {
        method: "POST",
        headers: new Headers({
          Accept: "*/*",
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({ userId: session?.user.id, comment }),
      },
    );
    const data = await response.json();
    setFetchingData((prev) => !prev);
    setComment("");
  };

  return (
    <section ref={commentRef}>
      <HeaderNav title={"Thread"} type={"back"} />
      {/* Main Content */}
      <section className="mx-auto mt-14 max-w-xl">
        {thread?._id && (
          <SinglePostCard post={{ ...thread, repliesCount: 2 }} />
        )}
      </section>
      {/* Replies */}
      <section className="mx-auto mb-14 max-w-xl">
        {threadReplies.map((reply) => (
          <div key={reply._id} className="post-separator">
            <CommentCard reply={reply} />
          </div>
        ))}
      </section>
      <div className="post-separator fixed bottom-0 left-0 right-0 mx-auto flex max-w-xl justify-between bg-threads-bg p-3">
        <div className="flex w-full gap-2 rounded-lg bg-threads-dark p-1 text-sm">
          <Image
            src={session?.user.image}
            width={30}
            height={30}
            className="rounded-full"
          />
          <input
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            name="comment"
            type="text"
            className="w-full border-none bg-transparent text-white placeholder-threads-gray outline-none"
            placeholder="Write a comment..."
          />
          <button className="cursor-pointer" onClick={handleComment}>
            <SendIcon width={30} height={30} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default UserPostPage;
