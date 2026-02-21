"use client";

import { Bot } from "lucide-react";

export function TypingIndicator() {
  return (
    <div className="flex gap-3 mb-6">
      <div
        className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
        style={{
          background: "linear-gradient(135deg, rgba(13,148,136,0.15), rgba(13,148,136,0.06))",
          border: "1px solid rgba(13,148,136,0.12)",
        }}
      >
        <Bot className="w-4 h-4 text-[#0D9488]" />
      </div>
      <div
        className="rounded-2xl rounded-tl-md px-5 py-4"
        style={{
          background: "#FFFFFF",
          border: "1px solid #E8E6E1",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <div className="flex items-center gap-1.5">
          <span
            className="w-2 h-2 rounded-full animate-bounce [animation-delay:0ms]"
            style={{ backgroundColor: "#0D9488" }}
          />
          <span
            className="w-2 h-2 rounded-full animate-bounce [animation-delay:150ms]"
            style={{ backgroundColor: "#0D9488" }}
          />
          <span
            className="w-2 h-2 rounded-full animate-bounce [animation-delay:300ms]"
            style={{ backgroundColor: "#0D9488" }}
          />
        </div>
      </div>
    </div>
  );
}
