"use client";

import Header from "@components/Header";
import CoverPage from "./cover/page";
import Feed from "@components/Feed";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { socket } from "@utils/socket";
import { useNotifications } from "@utils/context/notificationsContext";
import Navbar from "@components/Navbar";

const HomePage = () => {
  const { data: session } = useSession();
  const { addNotificationCounter, notificationsCounter } = useNotifications();

  useEffect(() => {
    if (session?.user) {
      socket.connect();
      socket.on("connect", () => {
        socket.emit("registerUserToSocket", session?.user.id);
        console.log("connected");
      });
      socket.on(`notification:${session?.user.id}`, () => {
        addNotificationCounter();
      });
      socket.on(`likesNotifications:${session?.user.id}`, (data) => {
        addNotificationCounter();
      });
    }
  }, [session, notificationsCounter]);

  return (
    <>
      {session?.user ? (
        <>
          <Navbar />
          <main className="text-threads-white">
            <Header />
            <div className="relative mx-auto flex max-w-xl">
              <Feed />
            </div>
          </main>
        </>
      ) : (
        <CoverPage />
      )}
    </>
  );
};

export default HomePage;
