"use client";

import type { ContextLevel } from "@/lib/types";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const levelColors: Record<ContextLevel, string> = {
  green: "#10B981",
  lightgreen: "#84CC16",
  yellow: "#F59E0B",
  orange: "#F97316",
  red: "#EF4444",
};

const levelLabels: Record<ContextLevel, string> = {
  green: "Context: Frisch",
  lightgreen: "Context: Gut",
  yellow: "Context: Mittel",
  orange: "Context: Gross",
  red: "Context: Voll",
};

function getContextLevel(messageCount: number): ContextLevel {
  // Estimate: ~500 tokens per message pair, 128k context window
  const estimatedUsage = (messageCount * 500) / 128000;
  if (estimatedUsage <= 0.2) return "green";
  if (estimatedUsage <= 0.4) return "lightgreen";
  if (estimatedUsage <= 0.6) return "yellow";
  if (estimatedUsage <= 0.8) return "orange";
  return "red";
}

interface ContextIndicatorProps {
  messageCount: number;
}

export function ContextIndicator({ messageCount }: ContextIndicatorProps) {
  const level = getContextLevel(messageCount);
  const label = levelLabels[level];
  const color = levelColors[level];
  const percentage = Math.min(Math.round((messageCount * 500) / 128000 * 100), 100);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full cursor-default"
          style={{
            background: `${color}10`,
            border: `1px solid ${color}20`,
          }}
        >
          <div className="relative">
            <span
              className="w-2 h-2 rounded-full block"
              style={{ backgroundColor: color }}
            />
            <span
              className="w-2 h-2 rounded-full block absolute inset-0 animate-ping opacity-40"
              style={{ backgroundColor: color }}
            />
          </div>
          <span className="text-xs" style={{ color }}>
            {label}
          </span>
        </div>
      </TooltipTrigger>
      <TooltipContent
        style={{
          background: "#FFFFFF",
          border: "1px solid #E8E6E1",
          boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
        }}
      >
        <p style={{ color: "#4B5563" }}>Kontext-Auslastung: ~{percentage}%</p>
      </TooltipContent>
    </Tooltip>
  );
}

export { getContextLevel };
