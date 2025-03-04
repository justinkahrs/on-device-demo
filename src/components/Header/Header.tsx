"use client";
import React from "react";
import VerifiedIcon from "@mui/icons-material/Verified";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Image from "next/image";
import styles from "./Header.module.css";

export function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.headerRow} />
      <div className={styles.logoContainer}>
        <Image src="/logo-square.jpg" alt="Logo" width={40} height={40} />
        <span className={styles.title}>Amastay</span>
      </div>
      <div className={styles.phoneNumber}>
        <div>Amastay </div>
        <VerifiedIcon fontSize="small" style={{ height: "12px" }} />
        <ChevronRightIcon style={{ height: "16px", marginLeft: "-10px" }} />
      </div>
    </div>
  );
}
