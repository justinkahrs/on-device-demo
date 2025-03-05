import type React from "react";
import { useRouter } from "next/navigation";

type RichLinkProps = {
  label: string;
  url?: string;
  external?: boolean;
};

export const RichLink = ({
  label,
  url = "https://www.apple.com",
  external = false,
}: RichLinkProps) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (external) {
      e.preventDefault();
      window.open(url, "_blank");
    } else {
      e.preventDefault();
      router.push(url);
    }
  };

  return (
    <a
      href={url}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onClick={handleClick}
      style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
    >
      {label}
    </a>
  );
};
