import type { Metadata } from "next";
import "./globals.css";
import { XmcProviderWrapper } from "@/components/providers";

export const metadata: Metadata = {
  title: "Sitecore Sites Manager",
  description: "Create and manage Sitecore sites from XM Cloud",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <XmcProviderWrapper>{children}</XmcProviderWrapper>
      </body>
    </html>
  );
}
