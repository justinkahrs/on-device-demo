"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Message,
  type RCSMessageEvent,
  TypingIndicator,
} from "../../components/Message/Message";
import styles from "./styles.module.css";
import { messages, QuickReplies } from "./messages";
import { PhoneContainer } from "../../components/PhoneContainer/PhoneContainer";
import { Header } from "../../components/Header/Header";
import { ChatWindow } from "../../components/ChatWindow/ChatWindow";

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
    if (messageIndex >= messages.length) return;
    const newMessage = messages[messageIndex];
    const timerId = setTimeout(() => {
      if (showTyping) {
        setTypingFrom(newMessage.from);
        setShowTyping(false);
      } else {
        setTypingFrom(null);
        setDisplayedMessages((prev) => [...prev, newMessage]);
        if (!newMessage.awaitUser) {
          setMessageIndex((i) => i + 1);
          setShowTyping(true);
        }
      }
    }, 1500);

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

  function handleQuickReply(option: string) {
    // Optionally, handle the selected option if needed
    setMessageIndex((prev) => prev + 1);
    setShowTyping(true);
  }

  function addOnSelectToQuickReplies(node: React.ReactNode): React.ReactNode {
    if (React.isValidElement(node)) {
      if (node.type === QuickReplies) {
        return React.cloneElement(node, { onSelect: handleQuickReply });
      }
      if (node.props && node.props.children) {
        return React.cloneElement(node, {
          children: React.Children.map(
            node.props.children,
            addOnSelectToQuickReplies
          ),
        });
      }
    }
    return node;
  }

  const handleRestart = () => {
    setDisplayedMessages([]);
    setMessageIndex(0);
    setTypingFrom(null);
    setShowTyping(true);
  };

  return (
    <>
      <PhoneContainer>
        <Header />
        <ChatWindow
          chatWindowRef={chatWindowRef as React.RefObject<HTMLDivElement>}
        >
          {displayedMessages.map((msg, i) => {
            let content = msg.text ? msg.text : msg.component;
            if (msg.awaitUser && msg.component) {
              content = addOnSelectToQuickReplies(msg.component);
            }
            return (
              <Message
                className={msg.text ? "txt" : "component"}
                from={msg.from}
                key={`${msg.from}-${i}`}
              >
                {content}
              </Message>
            );
          })}

          {typingFrom && <TypingIndicator from={typingFrom} />}
        </ChatWindow>
      </PhoneContainer>
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
