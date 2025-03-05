// src/components/RichLink/RichLink.tsx
"use client";
import type React from "react";
import { useRouter } from "next/navigation";

export const RichLink = ({
  label,
  url = "https://www.apple.com",
}: {
  label: string;
  url?: string;
}) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.push(url);
  };

  return (
    <a
      href={url}
      onClick={handleClick}
      style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
    >
      {label}
    </a>
  );
};
