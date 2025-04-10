"use client";
import React, { Suspense, useEffect, useLayoutEffect, useRef } from "react";
import {
  Message,
  TypingIndicator,
  type RCSMessageEvent,
} from "../components/Message/Message";
import { ChatWindow } from "../components/ChatWindow/ChatWindow";
import { useChat } from "../context/ChatContext";

export default function RcsDemo() {
  const { displayedMessages, typingFrom, start, status } = useChat();
  const lastBotMessageIndex = displayedMessages.reduce((acc, msg, index) => {
    return msg.from === "bot" ? index : acc;
  }, -1);

  const chatWindowRef = useRef<HTMLDivElement>(null);

  // On mount, automatically start the flow if we are "idle".
  useEffect(() => {
    if (status === "idle" && displayedMessages.length === 0) {
      start();
    }
  }, [status, start, displayedMessages]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: Scroll to bottom whenever messages change or typing changes
  useLayoutEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTo({
        top: chatWindowRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [displayedMessages, typingFrom]);

  function renderMessageContent(msg: RCSMessageEvent) {
    if (msg.text) return msg.text;

    if (React.isValidElement(msg.component)) {
      return msg.component;
    }
    return null;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChatWindow
        chatWindowRef={chatWindowRef as React.RefObject<HTMLDivElement>}
      >
        {displayedMessages.map((msg, i) => (
          <Message
            className={msg.text ? "txt" : "component"}
            from={msg.from}
            key={`${msg.from}-${i}`}
            messageIndex={i}
            isLatestBotMessage={msg.from === "bot" && i === lastBotMessageIndex}
          >
            {renderMessageContent(msg)}
          </Message>
        ))}
        {typingFrom && <TypingIndicator from={typingFrom} />}
      </ChatWindow>
    </Suspense>
  );
}