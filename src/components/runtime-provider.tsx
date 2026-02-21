"use client";

import { AssistantRuntimeProvider, useLocalRuntime } from "@assistant-ui/react";
import { n8nAdapter } from "@/lib/n8n-adapter";

export function RuntimeProvider({ children }: { children: React.ReactNode }) {
  const runtime = useLocalRuntime(n8nAdapter);

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      {children}
    </AssistantRuntimeProvider>
  );
}
