"use client";

import { MessageSquarePlus, Mountain, MoreHorizontal, HardHat } from "lucide-react";
import { CURRENT_COMPANY } from "@/lib/company-config";

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  "hard-hat": HardHat,
};

interface SidebarProps {
  onNewChat: () => void;
}

export function Sidebar({ onNewChat }: SidebarProps) {
  const company = CURRENT_COMPANY;
  const Icon = iconMap[company.icon];

  return (
    <div
      className="w-[300px] h-full flex flex-col relative shrink-0"
      style={{
        background: "#FFFFFF",
        borderRight: "1px solid #EAE8E4",
      }}
    >
      {/* Header */}
      <div className="px-5 pt-5 pb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #0D9488 0%, #0F766E 100%)",
              boxShadow: "0 4px 14px rgba(13, 148, 136, 0.3)",
            }}
          >
            <Mountain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-semibold tracking-tight" style={{ color: "#1A1A2E" }}>
              Digital Visibility Agent
            </h1>
            <p className="text-[11px]" style={{ color: "#9CA3AF" }}>
              Marketing-Berater
            </p>
          </div>
        </div>
      </div>

      {/* New Chat Button */}
      <div className="px-4 pb-3">
        <button
          onClick={onNewChat}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl transition-all duration-200 cursor-pointer"
          style={{
            background: "linear-gradient(135deg, #0D9488, #0F766E)",
            color: "#FFFFFF",
            boxShadow: "0 4px 14px rgba(13, 148, 136, 0.25)",
          }}
        >
          <MessageSquarePlus className="w-4 h-4" />
          <span className="text-sm">Neuer Chat</span>
        </button>
      </div>

      {/* Company info */}
      <div className="px-4 pb-3">
        <div className="flex items-center gap-3 px-2 py-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{
              background: `linear-gradient(135deg, ${company.gradient[0]}, ${company.gradient[1]})`,
              boxShadow: `0 3px 10px ${company.color}25`,
            }}
          >
            {Icon ? (
              <Icon className="w-4 h-4 text-white" />
            ) : (
              <span className="text-white text-xs">{company.initial}</span>
            )}
          </div>
          <div>
            <p className="text-sm" style={{ color: "#1A1A2E" }}>
              {company.name}
            </p>
            <p className="text-[11px]" style={{ color: "#9CA3AF" }}>
              Aktives Projekt
            </p>
          </div>
        </div>
      </div>

      {/* Chat list placeholder */}
      <div
        className="flex-1 overflow-y-auto px-3 pb-3"
        style={{ scrollbarWidth: "thin", scrollbarColor: "#D1D0CC transparent" }}
      >
        <p
          className="px-2 py-1.5 text-[10px] uppercase tracking-[0.1em]"
          style={{ color: "#B8B5AD" }}
        >
          Aktueller Chat
        </p>
        <p className="px-2 py-3 text-sm" style={{ color: "#9CA3AF" }}>
          Chat-Verlauf wird in einer zukünftigen Version verfügbar sein.
        </p>
      </div>

      {/* Footer */}
      <div
        className="px-4 py-4"
        style={{ borderTop: "1px solid #EAE8E4" }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #D4F0ED, #E8F8F6)",
              border: "1px solid #B8E4DF",
            }}
          >
            <span className="text-[11px]" style={{ color: "#0D9488" }}>MH</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm truncate" style={{ color: "#1A1A2E" }}>
              Maja Halle
            </p>
            <p className="text-[11px]" style={{ color: "#9CA3AF" }}>
              Marketing Expertin
            </p>
          </div>
          <button
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors cursor-pointer"
            style={{ color: "#C4C1BA" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#F7F6F3";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
