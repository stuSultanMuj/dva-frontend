import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { RuntimeProvider } from "@/components/runtime-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Digital Visibility Agent",
  description: "Marketing-Berater für digitale Sichtbarkeit",
};

function RayBackground() {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
      <div className="absolute inset-0 bg-[#0a0a0f]" />
      {/* Ambient blue glow from bottom center */}
      <div
        className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-[30%] w-[1200px] h-[700px] sm:w-[1800px] sm:h-[900px]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(20, 136, 252, 0.18) 0%, rgba(20, 136, 252, 0.06) 40%, transparent 70%)",
        }}
      />
      {/* Subtle horizon arc — thin blue line, no white */}
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-full"
        style={{
          width: "250vmax",
          height: "250vmax",
          bottom: "calc(-250vmax + 100px)",
          border: "1.5px solid rgba(77, 165, 252, 0.2)",
          boxShadow:
            "0 0 60px rgba(20, 136, 252, 0.06), 0 -1px 8px rgba(77, 165, 252, 0.1)",
        }}
      />
      {/* Second arc — even more subtle, slightly offset */}
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-full"
        style={{
          width: "260vmax",
          height: "260vmax",
          bottom: "calc(-260vmax + 110px)",
          border: "1px solid rgba(77, 165, 252, 0.08)",
        }}
      />
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de-CH">
      <body className={inter.className}>
        <RayBackground />
        <RuntimeProvider>{children}</RuntimeProvider>
      </body>
    </html>
  );
}
