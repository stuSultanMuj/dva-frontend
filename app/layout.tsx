import type { Metadata } from "next";
import { RuntimeProvider } from "@/components/runtime-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Digital Visibility Agent",
  description: "Marketing-Berater für digitale Sichtbarkeit",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de-CH">
      <body>
        <RuntimeProvider>{children}</RuntimeProvider>
      </body>
    </html>
  );
}
