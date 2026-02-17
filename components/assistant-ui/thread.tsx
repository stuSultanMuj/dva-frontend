"use client";

import { useState, useEffect } from "react";
import {
  ThreadPrimitive,
  ComposerPrimitive,
  MessagePrimitive,
} from "@assistant-ui/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
          className="text-[13px] text-gray-400 transition-all duration-300 ease-out"
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
              i <= stageIndex ? "bg-indigo-300" : "bg-gray-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// Rotating analysis messages — specificity builds trust,
// sequential framing creates progress illusion
const THINKING_MESSAGES = [
  "Analysiere deine Daten...",
  "Durchsuche Kampagnen-Performance...",
  "Vergleiche mit DACH-Benchmarks...",
  "Prüfe Kontext und Saisonalität...",
  "Formuliere Empfehlungen...",
];

function ThinkingIndicator() {
  const [messageIndex, setMessageIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setMessageIndex((i) => (i + 1) % THINKING_MESSAGES.length);
        setFade(true);
      }, 200);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-3 py-1">
      <div className="flex items-center gap-1">
        <span className="dva-dot" />
        <span className="dva-dot [animation-delay:0.2s]" />
        <span className="dva-dot [animation-delay:0.4s]" />
      </div>
      <span
        className="text-gray-500 transition-opacity duration-200"
        style={{ opacity: fade ? 1 : 0 }}
      >
        {THINKING_MESSAGES[messageIndex]}
      </span>
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

function EmptyState() {
  return (
    <div className="flex flex-grow basis-full flex-col items-center justify-center gap-6 text-center dva-fade-in">
      {/* Icon */}
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50">
        <svg
          className="h-7 w-7 text-indigo-500"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"
          />
        </svg>
      </div>

      <div>
        <h2 className="text-lg font-medium text-gray-900">Willkommen</h2>
        <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-gray-400">
          Frag mich zu deinen Marketing-Daten. Ich analysiere Performance,
          vergleiche Benchmarks und gebe Empfehlungen.
        </p>
      </div>

      {/* Example questions — visual hints */}
      <div className="flex w-full max-w-sm flex-col gap-2">
        {[
          "Wie hat sich unser CPC entwickelt?",
          "Welche Kampagne performt am besten?",
          "Vergleich unserer CTR mit DACH-Benchmarks",
        ].map((q) => (
          <div
            key={q}
            className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-left text-sm text-gray-500"
          >
            <span className="mr-2 text-indigo-300">→</span>
            {q}
          </div>
        ))}
      </div>
    </div>
  );
}

function Composer() {
  return (
    <div className="border-t border-gray-200/60 bg-white/80 p-4 backdrop-blur-sm">
      <ComposerPrimitive.Root className="mx-auto flex w-full max-w-2xl items-end gap-3">
        <ComposerPrimitive.Input
          placeholder="Stelle deine Frage..."
          className="flex-1 resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 transition-shadow duration-200 focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          autoFocus
        />
        <ComposerPrimitive.Send className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-500 text-white shadow-sm transition-all duration-150 hover:bg-indigo-600 active:scale-95 disabled:opacity-30 disabled:hover:bg-indigo-500">
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
      <div className="max-w-[75%] rounded-2xl rounded-br-md bg-indigo-500 px-4 py-2.5 text-sm text-white shadow-sm">
        <MessagePrimitive.Content />
      </div>
    </MessagePrimitive.Root>
  );
}

function AssistantMessage() {
  return (
    <MessagePrimitive.Root className="dva-message-enter mb-3 flex w-full max-w-2xl">
      <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-white px-4 py-3 text-sm text-gray-800 shadow-sm ring-1 ring-gray-100">
        <MessagePrimitive.Content components={{ Text: MarkdownText }} />
        <MessagePrimitive.InProgress>
          <ThinkingIndicator />
        </MessagePrimitive.InProgress>
      </div>
    </MessagePrimitive.Root>
  );
}
