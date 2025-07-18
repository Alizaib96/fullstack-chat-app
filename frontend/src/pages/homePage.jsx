import React from "react";
import { useChatStore } from "../store/useChatStore";
import SideBar from "../components/sideBar";
import NoChatSelected from "../components/noChatSelected";
import ChatContainer from "../components/chatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();
  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center px-4 pt-20">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full overflow-hidden rounded-lg">
            <SideBar />

            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
