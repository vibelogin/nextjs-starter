import type { Metadata } from "next";
import { VibeLoginProvider } from "@vibelogin/nextjs/client";

export const metadata: Metadata = {
  title: "VibeLogin Hosted Example",
  description: "Example app using VibeLogin hosted auth",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", margin: 0, padding: "2rem", maxWidth: 600, marginInline: "auto" }}>
        <VibeLoginProvider basePath="/api/auth">
          {children}
        </VibeLoginProvider>
      </body>
    </html>
  );
}
