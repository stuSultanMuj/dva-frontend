"use client";

import { useState, useEffect } from "react";
import {
  ThreadPrimitive,
  ComposerPrimitive,
  MessagePrimitive,
  useThreadRuntime,
} from "@assistant-ui/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Reusable DVA logo — abstract eye/lens with growth line inside
function DvaLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      {/* Eye/lens outer shape */}
      <path
        d="M2 12C2 12 6.5 5 12 5C17.5 5 22 12 22 12C22 12 17.5 19 12 19C6.5 19 2 12 2 12Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.4"
      />
      {/* Growth chart line as "pupil" */}
      <path
        d="M8 14L10.5 10.5L13.5 12.5L17 8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Peak dot */}
      <circle cx="17" cy="8" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function MarkdownText({ text }: { text: string }) {
  return (
    <div className="dva-markdown">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
    </div>
  );
}

// Sequential stages — specificity builds trust,
// progress framing reduces perceived wait time (Maister's First Law)
const THINKING_STAGES = [
  "Analysiere deine Frage...",
  "Durchsuche Kampagnen-Daten...",
  "Vergleiche mit DACH-Benchmarks...",
  "Prüfe Saisonalität und Kontext...",
  "Formuliere Empfehlungen...",
];

function ThinkingIndicator() {
  const [stageIndex, setStageIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setStageIndex((i) => (i + 1) % THINKING_STAGES.length);
        setVisible(true);
      }, 250);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dva-thinking-shimmer rounded-xl py-2">
      {/* Dots + stage message */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <span className="dva-dot" />
          <span className="dva-dot" style={{ animationDelay: "0.2s" }} />
          <span className="dva-dot" style={{ animationDelay: "0.4s" }} />
        </div>
        <span
          className="text-[13px] text-[#6a6a6f] transition-all duration-300 ease-out"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(-3px)",
          }}
        >
          {THINKING_STAGES[stageIndex]}
        </span>
      </div>

      {/* Progress segments — fills across stages */}
      <div className="mt-2.5 flex gap-1">
        {THINKING_STAGES.map((_, i) => (
          <div
            key={i}
            className={`h-[3px] flex-1 rounded-full transition-colors duration-500 ${
              i <= stageIndex ? "bg-[#1488fc]/60" : "bg-white/[0.06]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export function Thread() {
  return (
    <ThreadPrimitive.Root className="flex h-full flex-col">
      <ThreadPrimitive.Viewport className="flex flex-1 flex-col items-center overflow-y-auto scroll-smooth px-4 pt-10 pb-4">
        <ThreadPrimitive.Empty>
          <EmptyState />
        </ThreadPrimitive.Empty>

        <ThreadPrimitive.Messages
          components={{
            UserMessage,
            AssistantMessage,
          }}
        />
      </ThreadPrimitive.Viewport>

      <Composer />
    </ThreadPrimitive.Root>
  );
}

const EXAMPLE_QUESTIONS = [
  "Wie hat sich unser CPC entwickelt?",
  "Welche Kampagne performt am besten?",
  "Vergleich unserer CTR mit DACH-Benchmarks",
];

function EmptyState() {
  const threadRuntime = useThreadRuntime();

  const handleQuestionClick = (question: string) => {
    threadRuntime.append({
      role: "user",
      content: [{ type: "text", text: question }],
    });
  };

  return (
    <div className="flex flex-grow basis-full flex-col items-center justify-center gap-6 text-center dva-fade-in px-4">
      {/* DVA Logo — frosted glass container */}
      <div
        className="flex h-14 w-14 items-center justify-center rounded-2xl"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
          backdropFilter: "blur(20px) saturate(140%)",
          boxShadow:
            "inset 0 1px rgba(255,255,255,0.2), 0 0 0 1px rgba(255,255,255,0.08)",
        }}
      >
        <DvaLogo className="h-7 w-7 text-[#4da5fc]" />
      </div>

      {/* Title with gradient text */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-2">
          Was möchtest du{" "}
          <span className="bg-gradient-to-b from-[#4da5fc] via-[#4da5fc] to-white bg-clip-text text-transparent italic">
            analysieren
          </span>
          ?
        </h1>
        <p className="text-base text-[#8a8a8f]">
          Dein KI-Marketing-Berater für digitale Sichtbarkeit im DACH-Raum.
        </p>
      </div>

      {/* Clickable example questions */}
      <div className="flex w-full max-w-sm flex-col gap-2">
        {EXAMPLE_QUESTIONS.map((q) => (
          <button
            key={q}
            onClick={() => handleQuestionClick(q)}
            className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-left text-sm text-[#8a8a8f] hover:bg-white/[0.08] hover:text-white hover:border-[#1488fc]/30 transition-all duration-200 cursor-pointer"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}

function Composer() {
  return (
    <div className="border-t border-white/[0.06] bg-[#0a0a0f]/80 p-4 backdrop-blur-xl">
      <ComposerPrimitive.Root className="relative mx-auto flex w-full max-w-2xl items-end gap-3 rounded-2xl bg-[#1e1e22] px-4 py-3 ring-1 ring-white/[0.08] shadow-[0_2px_20px_rgba(0,0,0,0.4)]">
        <ComposerPrimitive.Input
          placeholder="Stelle deine Frage..."
          className="flex-1 resize-none bg-transparent text-[15px] text-white placeholder-[#5a5a5f] focus:outline-none"
          autoFocus
        />
        <ComposerPrimitive.Send className="flex h-10 shrink-0 items-center gap-2 px-4 rounded-full text-sm font-medium bg-[#1488fc] text-white transition-all duration-200 hover:bg-[#1a94ff] active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(20,136,252,0.3)]">
          <SendIcon />
        </ComposerPrimitive.Send>
      </ComposerPrimitive.Root>
    </div>
  );
}

function SendIcon() {
  return (
    <svg
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
      />
    </svg>
  );
}

function UserMessage() {
  return (
    <MessagePrimitive.Root className="dva-message-enter mb-3 flex w-full max-w-2xl justify-end">
      <div className="max-w-[75%] rounded-2xl rounded-br-md bg-[#1488fc] px-4 py-2.5 text-sm text-white shadow-lg shadow-[#1488fc]/10">
        <MessagePrimitive.Content />
      </div>
    </MessagePrimitive.Root>
  );
}

function AssistantMessage() {
  return (
    <MessagePrimitive.Root className="dva-message-enter mb-3 flex w-full max-w-2xl">
      <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-[#1a1a1e] px-4 py-3 text-sm text-[#e0e0e5] ring-1 ring-white/[0.06]">
        <MessagePrimitive.Content components={{ Text: MarkdownText }} />
        <MessagePrimitive.InProgress>
          <ThinkingIndicator />
        </MessagePrimitive.InProgress>
      </div>
    </MessagePrimitive.Root>
  );
}
