"use client";
import { useState, useEffect, useRef } from "react";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { SendIcon } from "@components/icons/SendIcon";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { socket } from "@utils/socket";

import ChatInCard from "@components/ChatInCard";
import ChatOutCard from "@components/ChatOutCard";

const loopChat = ({ chats, session, userData }) => {
  return (
    <>
      {chats.map((chat) => {
        if (chat.user_id === session?.user.id) {
          return <ChatOutCard message={chat.message} user={session} />;
        } else {
          return <ChatInCard message={chat.message} user={userData} />;
        }
      })}
    </>
  );
};

const MessageRoom = () => {
  const { data: session } = useSession();
  const { username } = useParams();
  const chatRef = useRef(null);
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [userData, setUserData] = useState({});
  const [fetchingData, setFetchingData] = useState(false);

  useEffect(() => {
    if (session?.user) {
      socket.connect();
      socket.on(`chat:${session?.user.id}`, (data) => {
        console.log(data);
        setChats((prev) => [...prev, data]);
        scrollToBottom();
      });
    }

    const fetchUserData = async () => {
      const res = await fetch(
        `http://localhost:5000/v1/users/${username}?userId=${session?.user.id}`,
      );
      const data = await res.json();
      setUserData(data.data);
    };
    session?.user && fetchUserData();
    scrollToBottom();
  }, [session]);

  useEffect(() => {
    const fetchChats = async () => {
      const res = await fetch(
        `http://localhost:5000/v1/chat/${session?.user.username}&${username}`,
      );
      const data = await res.json();
      console.log(data);
      setChats(data.chats);
    };

    session?.user && fetchChats();
  }, [session]);

  useEffect(() => {
    scrollToBottom();
  }, [chats, fetchingData]);

  const handleSendMessage = async (e) => {
    try {
      e.preventDefault();
      const res = await fetch(
        `http://localhost:5000/v1/chat/${session?.user.username}&${username}?userId=${session?.user.id}`,
        {
          method: "POST",
          headers: new Headers({
            Accept: "*/*",
            "Content-Type": "application/json",
          }),
          body: JSON.stringify({ message }),
        },
      );
      const data = await res.json();
      setMessage("");
    } catch (error) {
      console.log(error.message);
    } finally {
      setFetchingData((prev) => !prev);
    }
  };

  const scrollToBottom = () => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  };

  return (
    <>
      <nav className="fixed left-0 right-0 top-0 bg-threads-bg">
        <div className="flex w-full items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <Image
              onClick={() => router.back()}
              src={"/Assets/icon/Outline/Interface/Arrow left.svg"}
              width={25}
              height={25}
            />
            <div className="flex items-center gap-2 text-white">
              <Image
                src={userData.image}
                width={35}
                height={35}
                className="rounded-full object-contain"
              />
              <span>{userData.username}</span>
            </div>
          </div>
          <Image
            src={"/Assets/icon/Outline/Interface/Other-1.svg"}
            width={25}
            height={25}
          />
        </div>
      </nav>
      <section
        className="mb-20 mt-20 flex flex-col gap-8 px-2 text-white"
        ref={chatRef}
      >
        {chats.length === 0 ? (
          <>
            <div className="flex flex-col items-center justify-center gap-2">
              <span className="text-2xl font-bold">No Message</span>
            </div>
          </>
        ) : (
          loopChat({ chats, session, userData })
          // <> </>
        )}
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
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            name="message"
            type="text"
            className="w-full border-none bg-transparent text-white placeholder-threads-gray outline-none"
            placeholder="Message ..."
          />
          <button className="cursor-pointer" onClick={handleSendMessage}>
            <SendIcon width={30} height={30} />
          </button>
        </div>
      </div>
    </>
  );
};

export default MessageRoom;
