import { DvaHeader } from "@/components/dva-header";
import { Thread } from "@/components/assistant-ui/thread";

export default function Home() {
  return (
    <div className="relative z-[1] flex h-dvh flex-col">
      <DvaHeader />
      <div className="flex-1 overflow-hidden">
        <Thread />
      </div>
    </div>
  );
}
