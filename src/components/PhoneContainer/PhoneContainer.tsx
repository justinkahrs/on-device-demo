// src/components/PhoneContainer/PhoneContainer.tsx
import type React from "react";
import styles from "./PhoneContainer.module.css";

interface PhoneContainerProps {
  children: React.ReactNode;
}

export function PhoneContainer({ children }: PhoneContainerProps) {
  return (
    <div className={styles.phoneContainer}>
      {children}
      <div
        id="phone-portal"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "100%",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
