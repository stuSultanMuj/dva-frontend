"use client";

import { useCallback } from "react";
import { Sidebar } from "@/components/sidebar";
import { ChatHeader } from "@/components/chat-header";
import { Thread } from "@/components/assistant-ui/thread";
import { resetSession } from "@/lib/session";
import { useThreadRuntime } from "@assistant-ui/react";

export default function Home() {
  const threadRuntime = useThreadRuntime();

  const handleNewChat = useCallback(() => {
    resetSession();
    window.location.reload();
  }, []);

  // Estimate message count from thread state
  const messageCount = threadRuntime.getState().messages.length;

  return (
    <div className="flex h-dvh w-full overflow-hidden">
      <Sidebar onNewChat={handleNewChat} />
      <main
        className="flex-1 flex flex-col relative overflow-hidden"
        style={{ background: "#F9F8F6" }}
      >
        <ChatHeader messageCount={messageCount} />
        <div className="flex-1 overflow-hidden">
          <Thread />
        </div>
      </main>
    </div>
  );
}
