import type { Metadata } from "next";
import { appConfig } from "@/src/config/app";
import "./globals.css";

export const metadata: Metadata = {
  title: appConfig.metadata.title,
  description: appConfig.metadata.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
