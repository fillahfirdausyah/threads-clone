import "@styles/global.css";

import Provider from "@components/Provider";
import { NotificationsProvider } from "@utils/context/notificationsContext";

export const metadata = {
  title: "Threads Clone",
  description: "Let’s share what is in your mind with text based Social Media",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en" className="bg-threads-bg">
      <body className="font-lato">
        <Provider>
          <NotificationsProvider>
            <div className="relative">{children}</div>
          </NotificationsProvider>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
