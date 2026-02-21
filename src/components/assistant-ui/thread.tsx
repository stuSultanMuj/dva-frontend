"use client";

import { useState, useRef } from "react";
import {
  ThreadPrimitive,
  ComposerPrimitive,
  MessagePrimitive,
  useThreadRuntime,
} from "@assistant-ui/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Bot,
  User,
  ArrowUpRight,
  Copy,
  Check,
  Lightbulb,
  Stethoscope,
  ListChecks,
  ArrowRight,
} from "lucide-react";
import { parseMessageSections, type ParsedSections } from "@/lib/parse-sections";
import { CURRENT_COMPANY } from "@/lib/company-config";
import { QuickActions } from "@/components/quick-actions";
import { TypingIndicator } from "@/components/typing-indicator";

function MarkdownText({ text }: { text: string }) {
  return (
    <div className="dva-markdown">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
    </div>
  );
}

export function Thread() {
  return (
    <ThreadPrimitive.Root className="flex h-full flex-col">
      <ThreadPrimitive.Viewport className="flex flex-1 flex-col items-center overflow-y-auto scroll-smooth">
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
  const threadRuntime = useThreadRuntime();

  const handleQuestionClick = (question: string) => {
    threadRuntime.append({
      role: "user",
      content: [{ type: "text", text: question }],
    });
  };

  return (
    <div className="flex flex-grow basis-full flex-col items-center justify-center gap-6 text-center dva-fade-in px-4 relative">
      {/* Ambient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 40% at 50% 80%, rgba(13,148,136,0.06) 0%, transparent 60%),
            transparent
          `,
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Bot icon */}
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, rgba(13,148,136,0.12), rgba(13,148,136,0.04))",
            border: "1px solid rgba(13,148,136,0.12)",
          }}
        >
          <Bot className="w-7 h-7 text-[#0D9488]" />
        </div>

        {/* Heading */}
        <div>
          <h2 className="text-2xl font-semibold tracking-tight mb-2" style={{ color: "#1A1A2E" }}>
            Bereit für deine Fragen
          </h2>
          <p className="text-sm leading-relaxed max-w-md" style={{ color: "#8C8C9A" }}>
            Stelle eine Frage zur digitalen Sichtbarkeit von{" "}
            <span style={{ color: "#4B5563" }}>{CURRENT_COMPANY.name}</span> oder nutze
            eine der Schnellfragen unten.
          </p>
        </div>

        {/* Quick actions */}
        <QuickActions onAction={handleQuestionClick} />
      </div>
    </div>
  );
}

function Composer() {
  return (
    <div className="px-6 pb-6 pt-3 relative z-10">
      <ComposerPrimitive.Root className="flex items-end gap-3 px-4 py-3 rounded-2xl"
        style={{
          background: "#FFFFFF",
          border: "1px solid #E8E6E1",
          boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
        }}
      >
        <ComposerPrimitive.Input
          placeholder="Stelle eine Frage zur digitalen Sichtbarkeit..."
          className="flex-1 resize-none bg-transparent text-sm placeholder-[#B8B5AD] focus:outline-none min-h-[24px] max-h-[120px]"
          style={{ color: "#1A1A2E" }}
          autoFocus
        />
        <ComposerPrimitive.Send
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 disabled:opacity-20 shrink-0"
          style={{
            background: "linear-gradient(135deg, #0D9488 0%, #0F766E 100%)",
            boxShadow: "0 4px 12px rgba(13, 148, 136, 0.3)",
          }}
        >
          <ArrowUpRight className="w-4 h-4 text-white" />
        </ComposerPrimitive.Send>
      </ComposerPrimitive.Root>
      <p className="text-[11px] text-center mt-3" style={{ color: "#B8B5AD" }}>
        Zeitraum? Schreib ihn einfach in deine Frage, z.B. «letzte 7 Tage» oder «Januar 2026»
      </p>
    </div>
  );
}

function UserMessage() {
  return (
    <MessagePrimitive.Root className="dva-message-enter mb-6 flex w-full max-w-3xl justify-end px-6 gap-3">
      <div className="max-w-[75%]">
        <div
          className="px-4 py-3 rounded-2xl rounded-br-md text-sm text-white"
          style={{
            background: "linear-gradient(135deg, #0D9488 0%, #0F766E 100%)",
            boxShadow: "0 4px 16px rgba(13, 148, 136, 0.2)",
          }}
        >
          <MessagePrimitive.Content />
        </div>
      </div>
      <div
        className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
        style={{
          background: "#F3F2EF",
          border: "1px solid #E8E6E1",
        }}
      >
        <User className="w-4 h-4" style={{ color: "#8C8C9A" }} />
      </div>
    </MessagePrimitive.Root>
  );
}

function AssistantMessage() {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <MessagePrimitive.Root className="dva-message-enter mb-6 flex w-full max-w-3xl px-6 gap-3">
      <div
        className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
        style={{
          background: "linear-gradient(135deg, rgba(13,148,136,0.15), rgba(13,148,136,0.06))",
          border: "1px solid rgba(13,148,136,0.12)",
        }}
      >
        <Bot className="w-4 h-4 text-[#0D9488]" />
      </div>
      <div className="max-w-[85%] flex-1 min-w-0">
        <div
          ref={contentRef}
          className="rounded-2xl rounded-tl-md px-5 py-4"
          style={{
            background: "#FFFFFF",
            border: "1px solid #E8E6E1",
            boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
          }}
        >
          <MessagePrimitive.Content components={{ Text: AssistantText }} />
          <MessagePrimitive.InProgress>
            <TypingIndicatorInline />
          </MessagePrimitive.InProgress>
        </div>
        <div className="flex items-center justify-end mt-1.5 px-1">
          <CopyButton contentRef={contentRef} />
        </div>
      </div>
    </MessagePrimitive.Root>
  );
}

function TypingIndicatorInline() {
  return (
    <div className="flex items-center gap-1.5 py-1">
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
  );
}

function AssistantText({ text }: { text: string }) {
  const sections = parseMessageSections(text);

  if (!sections) {
    return <MarkdownText text={text} />;
  }

  return <StructuredSections sections={sections} />;
}

function StructuredSections({ sections }: { sections: ParsedSections }) {
  return (
    <div className="space-y-0">
      {/* Summary / Kurzfazit */}
      {sections.summary && (
        <div className="py-3">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-3.5 h-3.5 text-[#0D9488]" />
            <span className="text-[11px] tracking-[0.08em] text-[#0D9488] uppercase font-medium">
              Kurzfazit
            </span>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "#374151" }}>
            {sections.summary}
          </p>
        </div>
      )}

      {/* Diagnosis / Diagnose */}
      {sections.diagnosis && (
        <div
          className="py-3"
          style={{ borderTop: "1px solid #F3F2EF" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Stethoscope className="w-3.5 h-3.5" style={{ color: "#8C8C9A" }} />
            <span
              className="text-[11px] tracking-[0.08em] uppercase font-medium"
              style={{ color: "#8C8C9A" }}
            >
              Diagnose
            </span>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "#4B5563" }}>
            {sections.diagnosis}
          </p>
        </div>
      )}

      {/* Recommendations / Empfehlungen */}
      {sections.recommendations && sections.recommendations.length > 0 && (
        <div
          className="py-3"
          style={{ borderTop: "1px solid #F3F2EF" }}
        >
          <div className="flex items-center gap-2 mb-3">
            <ListChecks className="w-3.5 h-3.5" style={{ color: "#8C8C9A" }} />
            <span
              className="text-[11px] tracking-[0.08em] uppercase font-medium"
              style={{ color: "#8C8C9A" }}
            >
              Empfehlungen
            </span>
          </div>
          <ul className="space-y-2.5">
            {sections.recommendations.map((rec, idx) => {
              const isHigh = rec.toLowerCase().startsWith("hohe");
              const isMedium = rec.toLowerCase().startsWith("mittlere");
              const priorityColor = isHigh
                ? "#0D9488"
                : isMedium
                ? "#0EA5E9"
                : "#8C8C9A";
              const priorityBg = isHigh
                ? "rgba(13,148,136,0.08)"
                : isMedium
                ? "rgba(14,165,233,0.08)"
                : "rgba(140,140,154,0.08)";
              return (
                <li key={idx} className="flex gap-3 text-sm">
                  <span
                    className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 text-[10px] mt-0.5"
                    style={{
                      background: priorityBg,
                      color: priorityColor,
                      border: `1px solid ${priorityColor}20`,
                    }}
                  >
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed" style={{ color: "#4B5563" }}>
                    {rec}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Next Steps / Nächste Schritte */}
      {sections.nextSteps && sections.nextSteps.length > 0 && (
        <div
          className="py-3"
          style={{ borderTop: "1px solid #F3F2EF" }}
        >
          <div className="flex items-center gap-2 mb-3">
            <ArrowRight className="w-3.5 h-3.5" style={{ color: "#8C8C9A" }} />
            <span
              className="text-[11px] tracking-[0.08em] uppercase font-medium"
              style={{ color: "#8C8C9A" }}
            >
              Nächste Schritte
            </span>
          </div>
          <ul className="space-y-2">
            {sections.nextSteps.map((step, idx) => (
              <li key={idx} className="flex gap-2.5 text-sm items-start">
                <span className="text-[#0D9488] mt-0.5">→</span>
                <span className="leading-relaxed" style={{ color: "#4B5563" }}>
                  {step}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function CopyButton({ contentRef }: { contentRef: React.RefObject<HTMLDivElement | null> }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = contentRef.current?.innerText || "";
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs transition-all duration-200 cursor-pointer"
      style={{
        color: copied ? "#10B981" : "#9CA3AF",
        background: copied ? "rgba(16,185,129,0.08)" : "transparent",
      }}
      onMouseEnter={(e) => {
        if (!copied) e.currentTarget.style.background = "#F3F2EF";
      }}
      onMouseLeave={(e) => {
        if (!copied) e.currentTarget.style.background = "transparent";
      }}
      title="Kopieren"
    >
      {copied ? (
        <>
          <Check className="w-3 h-3" />
          <span>Kopiert</span>
        </>
      ) : (
        <>
          <Copy className="w-3 h-3" />
          <span>Kopieren</span>
        </>
      )}
    </button>
  );
}
