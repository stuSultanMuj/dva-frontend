import { DvaHeader } from "@/components/dva-header";
import { Thread } from "@/components/assistant-ui/thread";

export default function Home() {
  return (
    <div className="flex h-dvh flex-col bg-stone-50">
      <DvaHeader />
      <div className="flex-1 overflow-hidden">
        <Thread />
      </div>
    </div>
  );
}
