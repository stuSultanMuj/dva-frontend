"use client";

import { AlertTriangle } from "lucide-react";
import type { ContextLevel } from "@/lib/types";

interface ContextWarningProps {
  level: ContextLevel;
  onNewChat?: () => void;
}

export function ContextWarning({ level, onNewChat }: ContextWarningProps) {
  if (level !== "orange" && level !== "red") return null;

  const isRed = level === "red";
  const color = isRed ? "#EF4444" : "#F97316";
  const bgColor = isRed ? "rgba(239,68,68,0.06)" : "rgba(249,115,22,0.06)";
  const borderColor = isRed ? "rgba(239,68,68,0.15)" : "rgba(249,115,22,0.15)";

  return (
    <div
      className="flex items-center gap-3 mx-6 mb-3 px-4 py-3 rounded-xl"
      style={{
        background: bgColor,
        border: `1px solid ${borderColor}`,
      }}
    >
      <AlertTriangle className="w-4 h-4 shrink-0" style={{ color }} />
      <p className="text-sm flex-1" style={{ color: isRed ? "#DC2626" : "#EA580C" }}>
        {isRed
          ? "Der Kontext ist sehr voll. Die Antwortqualität könnte leiden."
          : "Der Kontext wird langsam gross."}{" "}
        <button
          onClick={onNewChat}
          className="underline underline-offset-2 hover:no-underline cursor-pointer transition-opacity hover:opacity-80"
          style={{ color }}
        >
          Neuer Chat empfohlen
        </button>
      </p>
    </div>
  );
}
