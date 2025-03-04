"use client";

import { useState, useEffect, useRef } from "react";
import VerifiedIcon from "@mui/icons-material/Verified";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import styles from "./styles.module.css";
import Image from "next/image";
import logoSquare from "../../assets/logo-square.jpg";
import { messages } from "./messages";

export default function RcsDemo() {
  // All messages to eventually display
  const allMessages = [...messages];

  // Track the subset of messages that have been shown
  const [displayedMessages, setDisplayedMessages] = useState<
    { from: string; text?: string; component?: React.ReactNode }[]
  >([]);

  // Track who is currently "typing"
  const [typingFrom, setTypingFrom] = useState<string | null>(null);

  // Current index into allMessages
  const [messageIndex, setMessageIndex] = useState<number>(0);

  // Whether we are in a typing phase
  const [showTyping, setShowTyping] = useState<boolean>(true);

  // Scroll reference
  const chatWindowRef = useRef<HTMLDivElement>(null);

  /*
    Logic:
    1) If messageIndex < allMessages.length, handle either typing or message display in 2 steps:
       - If showTyping == true, set typingFrom to the next message's sender.
       - If showTyping == false, hide typing indicator, display message, increment index, then reset showTyping.
  */
  useEffect(() => {
    if (messageIndex >= allMessages.length) {
      return; // we've shown all messages
    }

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
  }, [allMessages, messageIndex, showTyping]);

  // Always scroll to the bottom when a new message or typing indicator appears
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTo({
        top: chatWindowRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [displayedMessages, typingFrom]);

  return (
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
          <div
            key={i}
            className={
              msg.from === "guest" ? styles.myMessage : styles.theirMessage
            }
          >
            <div className={`${styles.bubble} ${styles.messageAppear}`}>
              {msg.component ? msg.component : msg.text}
            </div>
          </div>
        ))}

        {typingFrom && (
          <div
            className={
              typingFrom === "guest" ? styles.myMessage : styles.theirMessage
            }
          >
            <div className={`${styles.bubble} ${styles.messageAppear}`}>
              <span className={styles.typingDots}>
                <span>.</span>
                <span>.</span>
                <span>.</span>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
