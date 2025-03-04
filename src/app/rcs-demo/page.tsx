"use client";

import { useState, useEffect, useRef } from "react";
import VerifiedIcon from "@mui/icons-material/Verified";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Image from "next/image";

import logoSquare from "../../assets/logo-square.jpg";
import {
  Message,
  type RCSMessageEvent,
  TypingIndicator,
} from "./components/Message";
import styles from "./styles.module.css";
import { messages } from "./messages";

export default function RcsDemo() {
  const [displayedMessages, setDisplayedMessages] = useState<RCSMessageEvent[]>(
    []
  );

  const [typingFrom, setTypingFrom] = useState<
    "guest" | "bot" | "owner" | null
  >(null);

  const [messageIndex, setMessageIndex] = useState<number>(0);
  const [showTyping, setShowTyping] = useState<boolean>(true);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const allMessages = [...messages];

    if (messageIndex >= allMessages.length) return;

    const newMessage = allMessages[messageIndex];
    const timerId = setTimeout(() => {
      if (showTyping) {
        // Start typing for the next message sender
        setTypingFrom(newMessage.from);
        setShowTyping(false);
      } else {
        // End typing, display the actual message
        setTypingFrom(null);
        setDisplayedMessages((prev) => [...prev, newMessage]);
        setMessageIndex((i) => i + 1);
        setShowTyping(true);
      }
    }, 1500); // adjust delay as needed

    return () => clearTimeout(timerId);
  }, [messageIndex, showTyping]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: Always scroll to the bottom when a new message or typing indicator appears
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTo({
        top: chatWindowRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [displayedMessages, typingFrom]);

  const handleRestart = () => {
    setDisplayedMessages([]);
    setMessageIndex(0);
    setTypingFrom(null);
    setShowTyping(true);
  };

  return (
    <>
      <div className={styles.phoneContainer}>
        <div className={styles.volumeButtons}>
          <div className={styles.volumeButton} />
          <div className={styles.volumeButton} />
          <div className={styles.volumeButton} />
        </div>
        <div className={styles.powerButton} />
        <div className={styles.header}>
          <div className={styles.headerRow} />
          <div className={styles.logoContainer}>
            <Image src={logoSquare} alt="Logo" width={40} height={40} />
            <span className={styles.title}>Amastay</span>
          </div>
          <div className={styles.phoneNumber}>
            <div>Amastay </div>
            <VerifiedIcon fontSize="small" style={{ height: "12px" }} />
            <ChevronRightIcon style={{ height: "16px", marginLeft: "-10px" }} />
          </div>
        </div>

        <div ref={chatWindowRef} className={styles.chatWindow}>
          {displayedMessages.map((msg, i) => (
            <Message from={msg.from} key={`${msg.from}-${i}`}>
              {msg.component ? msg.component : msg.text}
            </Message>
          ))}

          {typingFrom && <TypingIndicator from={typingFrom} />}
        </div>
      </div>
      {messageIndex >= messages.length && (
        <button
          onClick={handleRestart}
          className={styles.restartButton}
          type="button"
        >
          Restart Demo
        </button>
      )}
    </>
  );
}
