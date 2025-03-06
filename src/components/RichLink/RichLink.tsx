import type React from "react";
import { useRouter } from "next/navigation";
import { useChat } from "@/context/ChatContext";

type RichLinkProps = {
  label: string;
  url: string;
  urlDisplay?: string;
  external?: boolean;
  src?: string;
  subtitle?: string;
  body?: string;
};

export const RichLink = ({
  label,
  url,
  urlDisplay,
  external = false,
  src,
  subtitle,
  body,
}: RichLinkProps) => {
  const router = useRouter();
  const { resume } = useChat();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (external) {
      e.preventDefault();
      window.open(url, "_blank");
      const resumeOnFocus = () => {
        resume();
        window.removeEventListener("focus", resumeOnFocus);
      };
      window.addEventListener("focus", resumeOnFocus);
    } else {
      e.preventDefault();
      router.push(url);
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        overflow: "hidden",
        maxWidth: "300px",
        fontFamily: "sans-serif",
        margin: "8px 0",
      }}
    >
      {src && (
        <div style={{ width: "100%", height: "150px", overflow: "hidden" }}>
          <img
            src={src}
            alt={label}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      )}
      <div style={{ padding: "8px" }}>
        <a
          href={url}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          onClick={handleClick}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div
            style={{
              fontWeight: "bold",
              fontSize: "1rem",
              marginBottom: "4px",
            }}
          >
            {label}
          </div>
          {subtitle && (
            <div
              style={{ fontSize: "0.9rem", color: "#666", marginBottom: "4px" }}
            >
              {subtitle}
            </div>
          )}
          {body && (
            <div
              style={{ fontSize: "0.9rem", color: "#333", marginBottom: "8px" }}
            >
              {body}
            </div>
          )}
          <div style={{ fontSize: "0.8rem", color: "#0070f3" }}>
            {urlDisplay || url}
          </div>
        </a>
      </div>
    </div>
  );
};
