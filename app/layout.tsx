import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Handbrake Bitrate Calc",
  description: "Calculate exact video bitrate for strict file size limits.",
  manifest: "/manifest.json", // Lien vers manifest pour PWA
  icons: {
    icon: [
      { url: "/favicon.ico" }, // Pour les vieux navigateurs
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }, // Standard moderne
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png" }, // Pour iPhone/iPad sur l'écran d'accueil
    ],
  },
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
    <html lang="fr">
      <body className="bg-background text-zinc-900 antialiased selection:bg-primary selection:text-white">
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
