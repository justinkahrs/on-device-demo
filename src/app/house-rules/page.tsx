"use client";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

export default function HouseRulesPage() {
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    fetch("/HouseRules.md")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch HouseRules.md");
        }
        return res.text();
      })
      .then((text) => setMarkdown(text))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  );
}
