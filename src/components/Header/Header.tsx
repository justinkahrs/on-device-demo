"use client";
import React from "react";
import VerifiedIcon from "@mui/icons-material/Verified";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import UndoIcon from "@mui/icons-material/Undo";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import styles from "./Header.module.css";
import { useChat } from "../../context/ChatContext";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { status } = useChat();

  const isFinished = status === "finished";
  return (
    <div className={styles.header}>
      {pathname !== "/" && (
        <button
          className={styles.backButton}
          onClick={() => router.push("/")}
          type="button"
        >
          <ChevronLeftIcon fontSize="large" />
        </button>
      )}
      <div className={styles.logoContainer}>
        <Image
          src="/logo-small.png"
          alt="Logo"
          width={40}
          height={40}
          className={styles.logo}
        />
        <span className={styles.title}>Amastay</span>
      </div>
      <div className={styles.phoneNumber}>
        <div>Amastay </div>
        <VerifiedIcon fontSize="small" style={{ height: "12px" }} />
        <ChevronRightIcon style={{ height: "16px", marginLeft: "-10px" }} />
      </div>
      {isFinished && (
        <button
          className={styles.restartButton}
          onClick={() => location.reload()}
          type="button"
        >
          <UndoIcon fontSize="large" />
          Restart
        </button>
      )}
    </div>
  );
}
