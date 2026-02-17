import type { ChatModelAdapter } from "@assistant-ui/react";
import { getSessionId } from "./session";

const thinkingSteps = [
  "Ich schaue mir die Daten an...",
  "Ich analysiere die Ergebnisse...",
];

export const n8nAdapter: ChatModelAdapter = {
  async *run({ messages, abortSignal }) {
    const lastUserMessage = [...messages]
      .reverse()
      .find((m) => m.role === "user");

    const chatInput =
      lastUserMessage?.content
        .filter((c) => c.type === "text")
        .map((c) => c.text)
        .join("\n") ?? "";

    // Show thinking indicator immediately
    const step = thinkingSteps[Math.floor(Math.random() * thinkingSteps.length)];
    yield { content: [{ type: "text" as const, text: step }] };

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chatInput,
        sessionId: getSessionId(),
      }),
      signal: abortSignal,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(
        error.message ?? "Anfrage fehlgeschlagen. Bitte versuche es erneut.",
      );
    }

    const data = await response.json();

    // Replace thinking text with actual response
    yield { content: [{ type: "text" as const, text: data.output }] };
  },
};
