"use client";
import NotificationsCard from "@components/NotificationsCard";
import Navbar from "@components/Navbar";

import { useNotifications } from "@utils/context/notificationsContext";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const NotificationsPage = () => {
  const { data: session } = useSession();
  const { removeAllNotificationsCounter, notificationsCounter } =
    useNotifications();
  const [notifications, setNotifications] = useState({
    follow: [],
    like: [],
    comments: [],
  });

  useEffect(() => {
    const getNotifications = async () => {
      const response = await fetch(
        `http://localhost:5000/v1/notifications?user_id=${session?.user.id}`,
      );
      const data = await response.json();
      setNotifications(data.data);
      removeAllNotificationsCounter();
    };

    session?.user && getNotifications();
  }, [session, notificationsCounter]);

  return (
    <>
      <Navbar />
      <section className="mx-auto mb-16 mt-4 max-w-xl overflow-x-hidden px-3 lg:mt-28">
        <div className="flex items-center">
          <h1 className="me-1 text-2xl font-semibold text-threads-white">
            Notifications Center
          </h1>
          <p>🔔</p>
        </div>
        <div className="mt-5">
          {notifications.follow.map((notification) => (
            <NotificationsCard
              key={notification._id}
              data={{ type: "follow", notification }}
            />
          ))}
          {notifications.like.map((notification) => (
            <NotificationsCard
              key={notification._id}
              data={{ type: "follow", notification }}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default NotificationsPage;
