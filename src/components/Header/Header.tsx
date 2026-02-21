"use client";
/* eslint-disable @next/next/no-img-element */
import React from "react";
import VerifiedIcon from "@mui/icons-material/Verified";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import UndoIcon from "@mui/icons-material/Undo";
import styles from "./Header.module.css";
import { useChat } from "../../context/ChatContext";

export interface HeaderProps {
  title?: string;
  subtitle?: string;
  logoSrc?: string;
  bannerColor?: string;
  showBackButton?: boolean;
  onBack?: () => void;
}

export function Header({
  title = "RCS Demo",
  subtitle = "Verified Business",
  logoSrc,
  bannerColor = "#AAA",
  showBackButton = false,
  onBack,
}: HeaderProps) {
  const { status, restart } = useChat();

  const isFinished = status === "finished";
  return (
    <div className={styles.header} style={{ backgroundColor: bannerColor }}>
      {showBackButton && onBack && (
        <button
          className={styles.backButton}
          onClick={onBack}
          type="button"
          aria-label="Go back"
        >
          <ChevronLeftIcon fontSize="large" />
        </button>
      )}
      <div className={styles.logoContainer}>
        {logoSrc ? (
          <img
            src={logoSrc}
            alt={`${title} logo`}
            width={40}
            height={40}
            className={styles.logo}
          />
        ) : (
          <div className={styles.logoFallback} aria-hidden="true">
            R
          </div>
        )}
        <span className={styles.title}>{title}</span>
      </div>
      <div className={styles.phoneNumber}>
        <div>{subtitle} </div>
        <VerifiedIcon fontSize="small" style={{ height: "12px" }} />
        <ChevronRightIcon style={{ height: "16px", marginLeft: "-10px" }} />
      </div>
      {isFinished && (
        <button
          className={styles.restartButton}
          onClick={restart}
          type="button"
          aria-label="Restart conversation"
        >
          <UndoIcon fontSize="large" />
          Restart
        </button>
      )}
    </div>
  );
}
