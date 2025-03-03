"use client";

import { useState, useEffect } from "react";
import styles from "./styles.module.css";

export default function RcsDemo() {
  // All messages to eventually display
  const messages = [
    {
      from: "agent",
      text: "Seat 17C, you got it. Now let’s talk food. Would you be happy with a vegetarian entree or a chicken entree?",
    },
    {
      from: "me",
      text: "I'll take the vegetarian option, please!",
    },
    {
      from: "agent",
      text: "Vegetarian it is! 🥗",
    },
  ];
  const allMessages = [...messages, ...messages];

  // Track the subset of messages that have been shown
  const [displayedMessages, setDisplayedMessages] = useState<
    { from: string; text: string }[]
  >([]);

  console.log("displayedMessages: ", displayedMessages);
  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      if (index < allMessages.length) {
        // Add the next message to the displayed list
        setDisplayedMessages((prev) => [...prev, allMessages[index]]);
        index++;
      } else {
        clearInterval(intervalId);
      }
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.phoneContainer}>
      <div className={styles.header}>
        <span>Happy Skies Airlines</span>
      </div>
      <div className={styles.chatWindow}>
        {displayedMessages
          .filter((msg) => msg !== undefined)
          .map((msg, i) => (
            <div
              key={i}
              className={
                msg.from === "me" ? styles.myMessage : styles.theirMessage
              }
            >
              {i}
              <div className={`${styles.bubble} ${styles.messageAppear}`}>
                {msg.text}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
