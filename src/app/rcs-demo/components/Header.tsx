"use client";
import React from "react";
import Image from "next/image";
import styles from "./Header.module.css";
import logoSquare from "../../../assets/logo-square.jpg";

export function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.headerRow}>
        <div className={styles.title}>Amastay</div>
      </div>
      <div className={styles.logoContainer}>
        <div className={styles.backButton}>&lt;</div>
        <Image src={logoSquare} alt="Logo" width={40} height={40} />
      </div>
      <div className={styles.phoneNumber}>1-(800)-798-2070</div>
    </div>
  );
}
