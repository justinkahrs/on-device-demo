"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./styles.module.css";
import { messages } from "./messages";

export default function RcsDemo() {
  // All messages to eventually display

  const allMessages = [...messages];

  // Track the subset of messages that have been shown
  const [displayedMessages, setDisplayedMessages] = useState<
    { from: string; text: string }[]
  >([]);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      if (index < allMessages.length) {
        // Add the next message to the displayed list
        const newMessage = allMessages[index];
        setDisplayedMessages((prev) => [...prev, newMessage]);
        index++;
      } else {
        clearInterval(intervalId);
      }
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [displayedMessages]);

  return (
    <div className={styles.phoneContainer}>
      <div className={styles.header}>
        <span>Happy Skies Airlines</span>
      </div>
      <div ref={chatWindowRef} className={styles.chatWindow}>
        {displayedMessages
          .filter((msg) => msg !== undefined)
          .map((msg, i) => (
            <div
              key={i}
              className={
                msg.from === "guest" ? styles.myMessage : styles.theirMessage
              }
            >
              <div className={`${styles.bubble} ${styles.messageAppear}`}>
                {msg.text}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}