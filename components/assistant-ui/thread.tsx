"use client";

import {
  ThreadPrimitive,
  ComposerPrimitive,
  MessagePrimitive,
} from "@assistant-ui/react";

export function Thread() {
  return (
    <ThreadPrimitive.Root className="flex h-full flex-col">
      <ThreadPrimitive.Viewport className="flex flex-1 flex-col items-center overflow-y-auto scroll-smooth px-4 pt-8">
        <ThreadPrimitive.Empty>
          <div className="flex flex-grow basis-full flex-col items-center justify-center gap-2 text-center">
            <p className="text-lg font-medium text-gray-900">
              Hallo! Ich bin der Digital Visibility Agent.
            </p>
            <p className="max-w-sm text-sm text-gray-500">
              Stelle mir eine Frage zu deinen Marketing-Daten, z.B.
              &laquo;Wie hat sich unser CPC entwickelt?&raquo;
            </p>
          </div>
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

function Composer() {
  return (
    <div className="border-t border-gray-200 bg-white p-4">
      <ComposerPrimitive.Root className="mx-auto flex w-full max-w-2xl gap-2">
        <ComposerPrimitive.Input
          placeholder="Stelle deine Frage..."
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          autoFocus
        />
        <ComposerPrimitive.Send className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50">
          Senden
        </ComposerPrimitive.Send>
      </ComposerPrimitive.Root>
    </div>
  );
}

function UserMessage() {
  return (
    <MessagePrimitive.Root className="mb-4 flex w-full max-w-2xl justify-end">
      <div className="max-w-[80%] rounded-lg bg-blue-600 px-4 py-2.5 text-sm text-white">
        <MessagePrimitive.Content />
      </div>
    </MessagePrimitive.Root>
  );
}

function AssistantMessage() {
  return (
    <MessagePrimitive.Root className="mb-4 flex w-full max-w-2xl">
      <div className="max-w-[80%] rounded-lg bg-gray-100 px-4 py-2.5 text-sm text-gray-900 [&_table]:my-2 [&_table]:w-full [&_table]:border-collapse [&_th]:border [&_th]:border-gray-300 [&_th]:bg-gray-200 [&_th]:px-2 [&_th]:py-1 [&_th]:text-left [&_td]:border [&_td]:border-gray-300 [&_td]:px-2 [&_td]:py-1 [&_ul]:ml-4 [&_ul]:list-disc [&_ol]:ml-4 [&_ol]:list-decimal [&_p]:mb-2 [&_p:last-child]:mb-0 [&_strong]:font-semibold [&_h3]:font-semibold [&_h3]:mt-3 [&_h3]:mb-1">
        <MessagePrimitive.Content />
      </div>
    </MessagePrimitive.Root>
  );
}
