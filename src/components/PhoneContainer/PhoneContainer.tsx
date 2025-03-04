"use client";
import type React from "react";
import styles from "./PhoneContainer.module.css";

interface PhoneContainerProps {
  children: React.ReactNode;
}

export function PhoneContainer({ children }: PhoneContainerProps) {
  return (
    <div className={styles.phoneContainer}>
      <div className={styles.volumeButtons}>
        <div className={styles.volumeButton} />
        <div className={styles.volumeButton} />
        <div className={styles.volumeButton} />
      </div>
      <div className={styles.powerButton} />
      {children}
    </div>
  );
}
