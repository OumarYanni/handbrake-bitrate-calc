import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Handbrake Bitrate Calc",
  description: "Calculate exact video bitrate for strict file size limits.",
  manifest: "/manifest.json", // On prépare le terrain pour la PWA
};

export const viewport: Viewport = {
  themeColor: "#f4f4f5",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-background text-zinc-900 antialiased selection:bg-primary selection:text-white">
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
