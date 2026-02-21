"use client";

import { TrendingUp, Trophy, CalendarDays } from "lucide-react";

const quickActions = [
  {
    label: "Wie entwickelt sich unsere Sichtbarkeit?",
    icon: TrendingUp,
  },
  {
    label: "Welcher Kanal performt am besten?",
    icon: Trophy,
  },
  {
    label: "Letzte 30 Tage bewerten",
    icon: CalendarDays,
  },
];

interface QuickActionsProps {
  onAction: (question: string) => void;
}

export function QuickActions({ onAction }: QuickActionsProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {quickActions.map((action) => {
        const Icon = action.icon;
        return (
          <button
            key={action.label}
            onClick={() => onAction(action.label)}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-sm transition-all duration-200 cursor-pointer group"
            style={{
              background: "#FFFFFF",
              border: "1px solid #E8E6E1",
              boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(13,148,136,0.06)";
              e.currentTarget.style.borderColor = "rgba(13,148,136,0.25)";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(13,148,136,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#FFFFFF";
              e.currentTarget.style.borderColor = "#E8E6E1";
              e.currentTarget.style.boxShadow = "0 1px 2px rgba(0,0,0,0.04)";
            }}
          >
            <Icon className="w-3.5 h-3.5 text-[#0D9488] group-hover:text-[#0F766E] transition-colors" />
            <span
              className="group-hover:text-[#1A1A2E] transition-colors"
              style={{ color: "#6B7280" }}
            >
              {action.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
