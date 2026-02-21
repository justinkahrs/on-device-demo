// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

import styles from "./styles.module.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "RCS Tech Demo Library",
  description: "Reusable React components for scripted RCS conversation demos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-FY7LC2PWMM"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-FY7LC2PWMM');
        `}
        </Script>
        <div className={styles.appWrap}>{children}</div>
      </body>
    </html>
  );
}
