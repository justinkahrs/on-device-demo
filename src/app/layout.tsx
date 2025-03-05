// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PhoneContainer } from "../components/PhoneContainer/PhoneContainer";
import { Header } from "../components/Header/Header";
import { ChatProvider } from "../context/ChatContext";

import styles from "./styles.module.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Amastay RCS Demo",
  description: "React app to simulate RCS interactions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className={styles.appWrap}>
          <ChatProvider>
            <PhoneContainer>
              <Header />
              {children}
            </PhoneContainer>
          </ChatProvider>
        </div>
      </body>
    </html>
  );
}
