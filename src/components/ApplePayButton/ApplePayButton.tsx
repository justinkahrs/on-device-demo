// src/components/ApplePayButton/ApplePayButton.tsx
import React from "react";

export const ApplePayButton = ({ label }: { label: string }) => {
  return (
    <button
      style={{
        background: "black",
        color: "white",
        padding: "8px 16px",
        borderRadius: "4px",
      }}
      type="button"
    >
      {label}
    </button>
  );
};