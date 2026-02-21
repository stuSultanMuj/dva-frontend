"use client";

import { HardHat } from "lucide-react";
import { CURRENT_COMPANY } from "@/lib/company-config";
import { ContextIndicator } from "./context-indicator";

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  "hard-hat": HardHat,
};

interface ChatHeaderProps {
  messageCount: number;
}

export function ChatHeader({ messageCount }: ChatHeaderProps) {
  const company = CURRENT_COMPANY;
  const Icon = iconMap[company.icon];

  return (
    <div
      className="px-6 py-4 flex items-center justify-between relative z-10 shrink-0"
      style={{
        background: "rgba(249,248,246,0.85)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid #EAE8E4",
      }}
    >
      <div className="flex items-center gap-3">
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
          <h3 className="text-sm font-medium" style={{ color: "#1A1A2E" }}>
            {company.name}
          </h3>
          <p className="text-[11px]" style={{ color: "#9CA3AF" }}>
            Digitale Sichtbarkeit
          </p>
        </div>
      </div>
      <ContextIndicator messageCount={messageCount} />
    </div>
  );
}
